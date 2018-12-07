// pages/registry/registry.js
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registryErrorMessage: "",
    registryErrorPasswd: "",
    registryUserName: "",
    registryPasswd: "",
    registryEmail: ""
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
  registrySystem: function (e) {
    var registryParam = {
      "ver": "1.0",
      "object": {
        "userName": this.data.registryUserName,
        "passwd": this.data.registryPasswd,
        "email": this.data.registryEmail
      }
    }
    wx.showLoading({
      title: '请稍后...',
      mask:true
    })
    wx.request({
      url: 'https://www.lywss.top/registry',
      data: JSON.stringify(registryParam),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code == 200) {
          Toast.success("注册成功!")
          wx.hideLoading();
          this.notifyRegistrySuccess()

          wx.navigateBack({
            delta: 1
          })
        } else if (res.data.code == 1000){
          wx.hideLoading();
          this.setData({
            registryPasswd: '',
            registryErrorPasswd: "密码不符合规范"
          })
        } else {
          wx.hideLoading();
          this.setData({
            registryPasswd: '',
            registryErrorMessage: '用户已注册'
          })
        }
      }
    })

  },
  onChangeRegistryUserName: function(e) {
    console.log(e.detail)
    this.setData({
      registryUserName: e.detail
    })
  },
  onChangeRegistryPasswd: function(e) {
    this.setData({
      registryPasswd: e.detail
    })
  },
  onChangeRegistryEmail: function(e) {
    this.setData({
      registryEmail: e.detail
    })
  },
  notifyRegistrySuccess: () => {
    console.log("====================")
    Notify({
      duration: 2000,
      text: '注册成功',
      selector: '#custom-selector',
      backgroundColor: '#38f'
    });
  }
})