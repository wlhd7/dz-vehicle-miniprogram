export const callCloud = (name, data) => {
  wx.showLoading({ title: '加载中' });
  const startTime = Date.now();
  
  return wx.cloud.callFunction({
    name,
    data
  }).then(res => {
    wx.hideLoading();
    const duration = Date.now() - startTime;
    console.log(`[Cloud] ${name} finished in ${duration}ms`);
    
    if (res.result && res.result.success) {
      return res.result;
    } else {
      const error = res.result?.error || 'Unknown Error';
      wx.showToast({ title: error, icon: 'none' });
      throw new Error(error);
    }
  }).catch(err => {
    wx.hideLoading();
    console.error(`[Cloud] ${name} failed:`, err);
    wx.showToast({ title: '网络错误', icon: 'none' });
    throw err;
  });
};
