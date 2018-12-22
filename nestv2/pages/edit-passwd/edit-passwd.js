// pages/edit-passwd/edit-passwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPasswd:"",
    newPasswdRepeat: "",
    emailCode:"",
    btnText: '发送验证码',
    countDownNum: 60,
    disabled: false,
    timer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      countDownNum: 60,
      btnText: '发送验证码',
      disabled: false
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
  changeButton: function () {

    this.setData({
      disabled: true
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
            loginErrorMessage: '发送失败，请检查用户名密码',
            disabled: false
          })

        }
      }
    })
  },
  onChangeNewPasswd: function (e) {
    this.setData({
      newPasswd: e.detail
    })
  },
  onChangeNewPasswdRepeat: function (e) {
    this.setData({
      newPasswdRepeat: e.detail
    })
  },
  onChangeEmailCode: function (e) {
    this.setData({
      emailCode: e.detail
    })
  },
  confirmModify: function(e) {
    
  }
})