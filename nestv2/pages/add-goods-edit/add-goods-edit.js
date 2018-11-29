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
    btnText:'添加',
    inputNameTag:false,
    inputGoodsNameTag: false,
    inputTipsTag: false,
    inputOldPriceTag: false,
    inputAmountTag: false
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
    var isEmpty = false;
    if (this.data.name === '') {
      isEmpty = true
      this.setData({
        inputNameTag: true
      })
    }
    if (this.data.goodsName === '') {
      isEmpty = true
      this.setData({
        inputGoodsNameTag: true
      })
    }
    if (this.data.tips === '' || this.data.tips <= 0) {
      isEmpty = true
      this.setData({
        inputTipsTag: true
      })
    }
    if (this.data.oldPrice === '' || this.data.oldPrice <= 0) {
      isEmpty = true
      this.setData({
        inputOldPriceTag: true
      })
    }
    if (this.data.amount === '' || this.data.amount <= 0) {
      isEmpty = true
      this.setData({
        inputAmountTag: true
      })
    }
    if (isEmpty) {
      return;
    }
    this.updateEdit(this.data.index)
  },
  onChangeName: function (e) {
    console.log(e.detail)
     
    this.setData({
      name: e.detail,
      inputNameTag:true
    })
  },
  onChangeGoodsName: function (e) {
    this.setData({
      goodsName: e.detail,
      inputGoodsNameTag:true
    })
  },
  onChangeCode: function (e) {
    this.setData({
      code: e.detail
    })
  },
  onChangeTips: function (e) {
    console.log(e.detail)
    this.setData({
      tips: parseFloat(e.detail === '' ? 0 : e.detail),
      inputTipsTag: true
    })
    console.log(this.data.tips)
  },
  onChangeColor: function (e) {
    this.setData({
      color: e.detail
    })
  },
  onChangeOldPrice: function (e) {
    this.setData({
      oldPrice: parseFloat(e.detail === '' ? 0 : e.detail),
      inputOldPriceTag:true
    })
  },
  onChangeNumbers: function (e) {
    this.setData({
      amount: parseInt(e.detail === '' ? 0 : e.detail),
      inputAmountTag:true
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
      console.log(this.data.oldPrice)
      var nameTemp = 'addList[' + index + '].name'
      var goodsNameTemp = 'addList[' + index + '].goodsName'
      var codeTemp = 'addList[' + index + '].code'
      var tipTemp = 'addList[' + index + '].tips'
      var colorTemp = 'addList[' + index + '].color'
      var oldPriceTemp = 'addList[' + index + '].oldPrice'
      var amountTemp = 'addList[' + index + '].amount'
      var remarkTemp = 'addList[' + index + '].remark'
      var sendTemp = 'addList[' + index + '].send'
      var isPayTemp = 'addList[' + index + '].isPay'

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
    if (this.data.send === 0 || this.data.send === '') {
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
    if (this.data.isPay === 0 || this.data.isPay === '') {
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