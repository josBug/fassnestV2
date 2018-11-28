import Toast from '../../dist/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    name: '',
    goodsName: '',
    code: '',
    tips: '',
    color: '',
    oldPrice: '',
    amount: '',
    remark: '',
    send:0,
    isPay:0,
    btnText:'添加'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index != '-1') {
      this.setData({
        index: parseInt(options.index),
        name: options.name,
        goodsName: options.goodsName,
        code: options.code,
        tips: parseFloat(options.tips),
        color: options.color,
        oldPrice: parseFloat(options.oldPrice),
        amount: parseInt(options.amount),
        remark: options.remark,
        send: parseInt(options.send),
        isPay: parseInt(options.isPay),
        btnText:'更新'      
      })
    }

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
  onClickSave: function (e) {
    this.updateEdit(this.data.index)
  },
  onChangeName: function (e) {
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
      amount: parseInt(e.detail)
    })
  },
  onclickCancel: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  onChangeRemark: function (e) {
    this.setData({
      remark: e.detail
    })
  },
  updateEdit: function (index) {
    wx.showLoading({
      title: '更新中...',
      mask: true
    })
    let page = getCurrentPages();
    let prevPage = page[page.length - 2];
    if (index === -1) {
      var data = {
        name: this.data.name,
        checkCell: false,
        goodsName: this.data.goodsName,
        amount: this.data.amount,
        code: this.data.code,
        oldPrice: this.data.oldPrice,
        tips: this.data.tips,
        send: this.data.send,
        isPay: this.data.isPay,
        color: this.data.color,
        remark: this.data.remark
      }
      var tempList = prevPage.data.addList;
      tempList.push(data)
      prevPage.setData({
        addList: tempList
      })
    } else {
      var nameTemp = 'list[' + index + '].name'
      var goodsNameTemp = 'list[' + index + '].goodsName'
      var codeTemp = 'list[' + index + '].code'
      var tipTemp = 'list[' + index + '].tips'
      var colorTemp = 'list[' + index + '].color'
      var oldPriceTemp = 'list[' + index + '].oldPrice'
      var amountTemp = 'list[' + index + '].amount'
      var remarkTemp = 'list[' + index + '].remark'
      var sendTemp = 'list[' + index + '].send'
      var isPayTemp = 'list[' + index + '].isPay'

      prevPage.setData({
        [nameTemp]: this.data.name,
        [goodsNameTemp]: this.data.goodsName,
        [codeTemp]: this.data.code,
        [tipTemp]: this.data.tips,
        [colorTemp]: this.data.color,
        [oldPriceTemp]: this.data.oldPrice,
        [amountTemp]: this.data.amount,
        [remarkTemp]: this.data.remark,
        [sendTemp]: this.data.send,
        [isPayTemp]:this.data.isPay
      })
    }
    
    wx.hideLoading();
    Toast.success('更新成功')
    wx.navigateBack({
      delta: 1
    })
  },
  onChangeSend: function(e) {
    if (this.data.send === 0) {
        this.setData({
          send:1
        })
    } else {
      this.setData({
        send: 0
      })
    }
  },
  onChangeIsPay: function(e) {
    if (this.data.isPay === 0) {
      this.setData({
        isPay: 1
      })
    } else {
      this.setData({
        isPay: 0
      })
    }
  }
})