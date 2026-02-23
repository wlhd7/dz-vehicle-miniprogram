App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-4gfqb62kd1c4383d', // 替换为你的云开发环境 ID
        traceUser: true,
      });
    }
  }
});
