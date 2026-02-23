const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_TYPE_CACHERE
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const countRes = await db.collection('passwords')
      .where({ status: 'unused' })
      .count();

    const count = countRes.total;

    if (count < 30) {
      // Find admin to notify
      const adminRes = await db.collection('admins').limit(1).get();
      if (adminRes.data.length > 0) {
        const adminOpenid = adminRes.data[0].openid;
        
        await cloud.openapi.subscribeMessage.send({
          touser: adminOpenid,
          templateId: 'LOW_PASSWORD_ALERT_TEMPLATE_ID', // Placeholder
          data: {
            phrase1: { value: '密码数量低' },
            number2: { value: count },
            thing3: { value: '请及时补充密码' }
          },
          page: 'pages/admin/admin'
        });
        
        return { success: true, notified: true, count };
      }
    }
    
    return { success: true, notified: false, count };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
