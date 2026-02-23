const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_TYPE_CACHERE
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { action, item } = event;
  const { OPENID } = cloud.getWXContext();

  // 1. Check Admin status
  const adminRes = await db.collection('admins').where({ openid: OPENID }).get();
  if (adminRes.data.length === 0) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    switch (action) {
      case 'create':
        await db.collection('items').add({ data: { ...item, status: 'available', currentHolderId: null } });
        break;
      case 'update':
        const { _id, ...data } = item;
        await db.collection('items').doc(_id).update({ data });
        break;
      case 'delete':
        await db.collection('items').doc(item._id).remove();
        break;
      default:
        throw new Error('Invalid action');
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
