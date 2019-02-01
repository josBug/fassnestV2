// pages/edit-passwd/edit-passwd.js
import Toast from '../../dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPasswd:"",
    newPasswd: "",
    repeatePassWd:""
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
  onChangeOldPasswd: function (e) {
    this.setData({
      oldPasswd: e.detail
    })
  },
  onChangeNewPasswd: function (e) {
    this.setData({
      newPasswd: e.detail
    })
  },
  onChangeRepeateNewPasswd: function (e) {
    this.setData({
      repeatePassWd: e.detail
    })
  },
  onConfirm: function (e) {
    if (this.data.repeatePassWd != this.data.newPasswd) {
      Toast.fail('新密码两次输入不一致');
      this.setData({
        newPasswd: "",
        repeatePassWd: ""
      })
      return
    }
    var mpassWd = {
      "ver": "1.0",
      "session": wx.getStorageSync("session"),
      "object":{
        "oldPasswd": this.data.oldPasswd,
        "newPasswd": this.data.newPasswd,
        "userName": wx.getStorageSync("userName")
      }
    }
    wx.request({
      url: 'https://www.lywss.top/update/passwd',
      data: JSON.stringify(mpassWd),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          Toast.success('修改成功请重新登录')
          wx.setStorageSync("session", "")
          let page = getCurrentPages();
          let prevPage = page[page.length - 4];
          prevPage.setData({
            userName: "",
            password: "",
            code:""
          })
          setTimeout(function () {
            wx.navigateBack({
              delta:3
            })
          }, 1000) 
        } else {
          Toast.fail('修改密码失败');
        }
      }
    })
  }
})