//index.js
import Toast from '../../dist/toast/toast';
//获取应用实例
const app = getApp()

Page({
  data: {
    userName:'',
    password:'',
    code:'',
    countDownNum:60,
    timer: '',
    btnText:'发送验证码',
    disabled:false,
    loginErrorMessage:""
  },
  onLoad: function () {
    this.setData({
      loginErrorMessage:"",
      userName:"",
      password:"",
      code: ''
    })
    this.setData({
      countDownNum: 60,
      btnText: '发送验证码',
      disabled: false
    })
  },
  onShow: function () {
    this.setData({
      loginErrorMessage: "",
      userName: "",
      password: "",
      code: ''
    })
    this.setData({
      countDownNum: 60,
      btnText: '发送验证码',
      disabled: false
    })
    clearInterval(this.data.timer);
    wx.setStorageSync("session", "")
    wx.setStorageSync("userName", "")
  },
  loginSystem: function() {
    var loginParam = {
      "ver": "1.0",
      "object": {
        "userName": this.data.userName,
        "passwd": this.data.password,
        "emailCode": this.data.code
      }
    }
    wx.showLoading({
      title: '登录中...',
      mask: true
    })
    wx.request({
      url: 'https://www.lywss.top/check/user',
      data: JSON.stringify(loginParam),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code == 200) {
          Toast.success("登录成功!")
          wx.hideLoading();
          wx.setStorageSync("session", res.data.result)
          wx.setStorageSync("userName", this.data.userName)
          wx.navigateTo({
            url: '../search/search'
          })
        } else {
          wx.hideLoading();
          this.setData({
            password: '',
            loginErrorMessage: '登录失败，请检查用户名密码'
          })
        }
      }
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
    var registryParam = {
      "ver": "1.0",
      "object": {
        "userName": this.data.userName,
        "passwd": this.data.password
      }
    }
    wx.request({
      url: 'https://www.lywss.top/send/code',
      data: JSON.stringify(registryParam),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code == 200) {
          Toast.success("发送成功!请查看邮箱验证码")
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
                  disabled: false
                })
                //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                clearInterval(that.data.timer);
                //关闭定时器之后，可作其他处理codes go here
              }
            }, 1000)
          })
        } else {
          this.setData({
            password: '',
            loginErrorMessage: '发送失败，请检查用户名密码'
          })
        }
      }
    })
  },
  onClickRegistry: function(e) {
    wx.navigateTo({
      url: '../registry/registry',
    })
  },
  onChangeLoginUserName: function(e) {
    this.setData({
      userName:e.detail
    })
  },
  onChangeLoginPasswd: function (e) {
    this.setData({
      password: e.detail
    })
  },
  onChangeLoginEmailCode: function (e) {
    this.setData({
      code: e.detail
    })
  }

})
