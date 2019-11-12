// pages/home/home.js
import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    var isSession = wx.getStorageSync("session")
    console.log("isSession:" + isSession)
    if (isSession != '') {
      wx.navigateTo({
        url: '../search/search'
      })
      return
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success: res => {
          //     console.log("asasa" + JSON.stringify(res.userInfo))
          //     this.loginWx(res);
          //   }
          // })
        } else {

        }
      },
      fail(res) {

      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    this.loginWx(e.detail);
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
  toLogin: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  loginWx: function (res) {
    wx.showLoading({
      title: '登录中...',
      mask: true
    })
    wx.login({
      success(reslogin) {
        if (reslogin.code) {
          var loginParam = {
            "ver": "1.0",
            "object": {
              "nickName": res.userInfo.nickName,
              "code": reslogin.code,
              "avatarUrl": res.userInfo.avatarUrl
            }
          }
          //发起网络请求
          wx.request({
            url: 'https://www.lywss.top/wx/login', //'https://www.lywss.top/wx/login',
            data: JSON.stringify(loginParam),
            header: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            method: "POST",
            success: resLoginWx => {
              console.log(resLoginWx.data);
              if (resLoginWx.data.code == 200) {
                Toast.success("登录成功!")
                wx.hideLoading();
                wx.setStorageSync("session", resLoginWx.data.session)
                wx.setStorageSync("userName", resLoginWx.data.userName)
                wx.setStorageSync("nickName", resLoginWx.data.nickName)
                wx.navigateTo({
                  url: '../search/search'
                })
              } else {
                wx.hideLoading();
              }
            },
            fail: resLoginWx => {
              wx.hideLoading();
              console.log('登录失败！' + resLoginWx.data)              
              Toast.fail("登录失败!")
            }
          })
        } else {
          wx.hideLoading();
          Toast.fail("登录失败!")
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})