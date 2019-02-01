// pages/edit/edit.js
import Toast from '../../dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:-1,
    name:'',
    goodsName:'',
    code: '',
    tips: '',
    color: '',
    oldPrice: '',
    numbers: '',
    sellPrice:'',
    id:-1,
    remark:'',
    source: '',
    pickIndex: 0,
    arrayPicker: ['爱xx', '宝xx', '舟xx']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.source)
    for (var i = 0; i < this.data.arrayPicker.length; ++ i) {
      if (options.source === this.data.arrayPicker[i]) {
        this.setData({
          pickIndex:i
        })
      }
    }
    this.setData({
      id:parseInt(options.id),
      index: parseInt(options.index),
      name: options.name,
      goodsName: options.goodsName,
      code: options.code,
      tips: parseFloat(options.tips),
      color: options.color,
      sellPrice: parseFloat(options.sellPrice),
      oldPrice: parseFloat(options.oldPrice),
      numbers: parseInt(options.numbers),
      remark: options.remark === '空' ? '' : options.remark,
      source:options.source
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
  onClickSave: function(e) {

    var param = {
      "ver": "1.0",
      "session": wx.getStorageSync("session"),
      "userName": "",
      "object": {
        goodsRecords:[{
          id:this.data.id,
          goodsName:this.data.goodsName,
          name:this.data.name,
          code:this.data.code,
          tip:this.data.tips,
          color:this.data.color,
          oldPrice:this.data.oldPrice,
          amount:this.data.numbers,
          remark:this.data.remark,
          source:this.data.source,
          sellPrice: this.data.sellPrice
        }]
      }
    }
    console.log(this.data.id + "=======")
    this.updateEdit(this.data.index, param)

  },
  onChangeName: function(e) {
    console.log(e.detail)
    this.setData({
      name: e.detail
    })
  },
  onChangeGoodsName: function (e) {
    this.setData({
      goodsName: e.detail
    })
  }, 
  onChangeCode: function (e) {
    this.setData({
      code: e.detail
    })
  }, 
  onChangeTips: function (e) {
    this.setData({
      tips: parseFloat(e.detail)
    })
  },
  onChangeSell: function (e) {
    this.setData({
      sellPrice: parseFloat(e.detail)
    })
  },
  onChangeColor: function (e) {
    this.setData({
      color: e.detail
    })
  }, 
  onChangeOldPrice: function (e) {
    this.setData({
      oldPrice: parseFloat(e.detail)
    })
  }, 
  onChangeNumbers: function (e) {
    this.setData({
      numbers: parseInt(e.detail)
    })
  },
  onclickCancel: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  onChangeRemark: function(e) {
    this.setData({
      remark: e.detail
    })
  },
  bindPickerChange:function(e) {
    this.setData({
      pickIndex: e.detail.value,
      source:this.data.arrayPicker[e.detail.value]
    })
  },
  updateEdit: function(index, param) {
    wx.showLoading({
      title: '更新中...',
      mask:true
    })
    wx.request({
      url: 'https://www.lywss.top/update',
      data: JSON.stringify(param),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code === 200) {
          Toast.success('更新成功')
          let page = getCurrentPages();
          let prevPage = page[page.length - 2];
          var nameTemp = 'list[' + index + '].name'
          var goodsNameTemp = 'list[' + index + '].goodsName'
          var codeTemp = 'list[' + index + '].code'
          var tipTemp = 'list[' + index + '].tip'
          var colorTemp = 'list[' + index + '].color'
          var oldPriceTemp = 'list[' + index + '].oldPrice'
          var amountTemp = 'list[' + index + '].amount'
          var remarkTemp = 'list[' + index + '].remark'
          var sourceTemp = 'list[' + index + '].source'
          var sellTemp = 'list[' + index + '].sellPrice'

          
          prevPage.setData({
            [nameTemp]: this.data.name,
            [goodsNameTemp]: this.data.goodsName,
            [codeTemp]: this.data.code,
            [tipTemp]: this.data.tips,
            [colorTemp]: this.data.color,
            [oldPriceTemp]: this.data.oldPrice,
            [amountTemp]: this.data.numbers,
            [sellTemp]: this.data.sellPrice,
            [remarkTemp]: this.data.remark == '' ? '空' : this.data.remark,
            [sourceTemp]: this.data.source == '' ? '空' : this.data.source
          })
          var param = {
            "ver": "1.0",
            "session": wx.getStorageSync("session"),
            "userName": "",
            "object": {
              "goodsName": prevPage.data.goodsName,
              "name": prevPage.data.name,
              "id": 0,
              "isPay": prevPage.data.isPay === true ? 1 : 0,
              "isSend": prevPage.data.isSend === true ? 1 : 0,
              "startTime": prevPage.data.startTime + " " + "00:00:00",
              "endTime": prevPage.data.endTime + " " + "23:59:59",
              "sort": prevPage.data.sort
            }
          }
          prevPage.getStatistic(param)
          wx.navigateBack({
            delta: 1
          })
        }
        
      },
      fail: res => {
        Toast.fail('更新失败')
        wx.hideLoading();
      }
    })
  }
})