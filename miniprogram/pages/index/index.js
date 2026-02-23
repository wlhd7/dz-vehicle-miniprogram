Page({
  data: {
    items: [],
    selectedItem: null,
    assignedPassword: '',
  },

  onLoad() {
    this.fetchItems();
  },

  fetchItems() {
    wx.cloud.database().collection('items').get().then(res => {
      this.setData({ items: res.data });
    });
  },

  selectItem(e) {
    const { id, identifier } = e.currentTarget.dataset;
    const item = this.data.items.find(i => i._id === id);
    if (item.status !== 'available') return;
    this.setData({ selectedItem: { _id: id, identifier } });
  },

  confirmPickup() {
    const { selectedItem } = this.data;
    wx.showLoading({ title: '处理中' });
    
    wx.cloud.callFunction({
      name: 'pickupItem',
      data: {
        itemId: selectedItem._id,
        userNickname: wx.getStorageSync('userInfo')?.nickName || '微信用户'
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        this.setData({
          assignedPassword: res.result.password,
          selectedItem: null
        });
        this.fetchItems();
      } else {
        wx.showToast({ title: res.result.error, icon: 'none' });
      }
    });
  },

  closeModal() {
    this.setData({ assignedPassword: '' });
  }
});
