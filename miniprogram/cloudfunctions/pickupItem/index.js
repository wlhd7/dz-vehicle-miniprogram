const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_TYPE_CACHERE
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { itemId, userNickname } = event;
  const { OPENID } = cloud.getWXContext();

  try {
    // 1. Find unused password
    const passwordRes = await db.collection('passwords')
      .where({ status: 'unused' })
      .limit(1)
      .get();

    if (passwordRes.data.length === 0) {
      return { success: false, error: 'No passwords available' };
    }

    const password = passwordRes.data[0];

    // 2. Transactional update
    const result = await db.runTransaction(async transaction => {
      const itemDoc = await transaction.collection('items').doc(itemId).get();
      if (!itemDoc.data || itemDoc.data.status !== 'available') {
        throw new Error('Item not available');
      }

      // Update password status
      await transaction.collection('passwords').doc(password._id).update({
        data: { status: 'assigned' }
      });

      // Update item status
      await transaction.collection('items').doc(itemId).update({
        data: {
          status: 'picked_up',
          currentHolderId: OPENID
        }
      });

      // Log transaction
      await transaction.collection('transactions').add({
        data: {
          userId: OPENID,
          userNickname,
          itemId,
          actionType: 'pickup',
          assignedPassword: password.value,
          timestamp: db.serverDate()
        }
      });

      return password.value;
    });

    return { success: true, password: result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
