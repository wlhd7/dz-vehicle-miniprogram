const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_TYPE_CACHERE
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { passwords } = event; // Array of strings
  const { OPENID } = cloud.getWXContext();

  const adminRes = await db.collection('admins').where({ openid: OPENID }).get();
  if (adminRes.data.length === 0) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const tasks = passwords.map(p => {
      return db.collection('passwords').add({
        data: {
          value: p,
          status: 'unused',
          createdAt: db.serverDate()
        }
      });
    });

    await Promise.all(tasks);
    return { success: true, count: passwords.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
