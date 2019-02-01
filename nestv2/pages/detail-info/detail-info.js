// pages/detail-info/detail-info.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mail:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getMail = {
      "ver": "1.0",
      "session": wx.getStorageSync("session")
    }
    wx.request({
      url: 'https://www.lywss.top/get/email',
      data: JSON.stringify(getMail),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            mail: res.data.result
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onClickModifyPasswd: function() {
    wx.navigateTo({
      url: '../edit-passwd/edit-passwd',
    })
  }
})