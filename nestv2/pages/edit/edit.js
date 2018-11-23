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
    id:-1,
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      index: options.index,
      name: options.name,
      goodsName: options.goodsName,
      code: options.code,
      tips: options.tips,
      color: options.color,
      oldPrice: options.oldPrice,
      numbers: options.numbers,
      remark: options.remark === '空' ? '' : options.remark
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
      "session": "",
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
          remark:this.data.remark
        }]
      }
    }
    console.log(this.data.id + "=======")
    this.updateEdit(this.data.index, param)

  },
  onChangeName: function(e) {
    console.log(e.detail)
  },
  onChangeGoodsName: function (e) {

  }, 
  onChangeCode: function (e) {

  }, 
  onChangeTips: function (e) {

  }, 
  onChangeColor: function (e) {

  }, 
  onChangeOldPrice: function (e) {

  }, 
  onChangeNumbers: function (e) {

  },
  onclickCancel: function(e) {

  },
  onChangeRemark: function(e) {

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
          
          prevPage.setData({
            [nameTemp]: this.data.name,
            [goodsNameTemp]: this.data.goodsName,
            [codeTemp]: this.data.code,
            [tipTemp]: this.data.tips,
            [colorTemp]: this.data.color,
            [oldPriceTemp]: this.data.oldPrice,
            [amountTemp]: this.data.numbers,
            [remarkTemp]: this.data.remark == '' ? '空' : this.data.remark
          })
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