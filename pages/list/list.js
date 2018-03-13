// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    showBottom: false,
    lastOrder: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady。。。")
    if (this.data.data == null) {
      console.log("开始刷新。。。。")
      wx.startPullDownRefresh()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.request({
      url: 'https://api.readhub.me/topic',
      success: (res) => {
        console.log(res)
        var mData = res.data.data;
        var last = mData[mData.length - 1];
        this.setData({
          data: mData,
          lastOrder: last.order
        })
        console.log(this.data.lastOrder)
        wx.stopPullDownRefresh()
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      showBottom: true
    })
    wx.request({
      url: 'https://api.readhub.me/topic?lastCursor=' + this.data.lastOrder,
      success: (res) => {
       var result = res.data.data
        console.log(res)
        var currentData = this.data.data.concat(result)
        this.setData({
          data: currentData,
          lastOrder: result[result.length - 1].order,
          showBottom: false
        })
        console.log(this.data.lastOrder)
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onItemClick: function (event) {
    console.log(event)
    console.log(event.currentTarget)
    console.log(event.currentTarget.dataset.title)
    wx.showToast({
      title: event.currentTarget.dataset.title,
    })
  }
})