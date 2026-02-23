Page({
  data: {
    activeItems: [],
    assignedPassword: '',
  },

  onShow() {
    this.fetchActiveItems();
  },

  fetchActiveItems() {
    wx.showLoading({ title: '获取中' });
    wx.cloud.database().collection('items')
      .where({
        status: 'picked_up',
        currentHolderId: '{openid}' // CloudBase uses '{openid}' automatically in some queries
      }).get().then(res => {
        wx.hideLoading();
        this.setData({ activeItems: res.data });
      });
  },

  confirmReturn(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认归还',
      content: '确认归还此项吗？',
      success: (res) => {
        if (res.confirm) {
          this.executeReturn(id);
        }
      }
    });
  },

  executeReturn(itemId) {
    wx.showLoading({ title: '处理中' });
    wx.cloud.callFunction({
      name: 'returnItem',
      data: {
        itemId,
        userNickname: wx.getStorageSync('userInfo')?.nickName || '微信用户'
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        this.setData({
          assignedPassword: res.result.password
        });
        this.fetchActiveItems();
      } else {
        wx.showToast({ title: res.result.error, icon: 'none' });
      }
    });
  },

  closeModal() {
    this.setData({ assignedPassword: '' });
  }
});
