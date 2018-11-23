//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    session:null,
    userName:'',
    passWd:'',
    code:'',
    condition:true
  },
  //事件处理函数
  bindViewTap: function() {
    console.log("++++++++++++++++++++")
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //user-motto   "scope.userLocation": true
        // }
      }
    })
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log("yyyyyyyyyyyyyyyyyyyyy")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (app.globalData.session) {
      
    }
  },
  getUserInfo: function(e) {
    console.log("===============" +e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  loginSystem: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  bindInputUser: function(e) {
    this.setData({
      userName:e.detail.value
    })
  },
  bindInputPasswd: function(e) {
    console.log(e.detail.value)
    this.setData({
      passWd: e.detail.value
    })
  },
  bindInputCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  changeButton: function() {
    if (this.data.condition) {
      this.setData({
        condition:false
      })
    } else {
      this.setData({
        condition: true
      })
    }
  }
})
