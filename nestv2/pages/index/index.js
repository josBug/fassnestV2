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
    password:'',
    code:'',
    condition:true,
    countDownNum:60,
    timer: '',
    btnText:'发送验证码',
    disabled:false,
    isLogin:true,
    registryUserName:"",
    registryPasswd:"",
    registryEmail:"",
    loginErrorMessage:"",
    registryErrorMessage:""
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

    this.setData({
      disabled:true
    })
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    if (countDownNum < 60) {
      return;
    }
    that.setData({
      timer: setInterval(() => {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        console.log(countDownNum)
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum,
          btnText: this.data.countDownNum + '秒',
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          that.setData({
            countDownNum: 60,
            btnText: '发送验证码',
            disabled:false
          })
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  },
  onClickRegistry: function(e) {
    this.setData({
      isLogin:false
    })
  },
  onChangeLoginUserName: function(e) {
    this.setData({
      userName:e.detail.value
    })
  },
  onChangeLoginPasswd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  onChangeLoginEmailCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  registrySystem: function(e) {
    this.setData({
      isLogin: true
    })
  },
  cancelRegistry: function(e) {
    this.setData({
      isLogin: true
    })
  }
})
