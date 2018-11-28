// pages/add-goods-list/add-goods-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList:[],
    checked:false
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
  selectAll: function() {
    this.setData({
      checked:!this.data.checked
    })
  },
  onClickCheckBox: function(e) {
    console.log(e)
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var checkCellTemp = "addList[" + id + "].checkCell"
    this.setData({
      [checkCellTemp]:!this.data.addList[id].checkCell
    })
  },
  onClickNewGoods: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../add-goods-edit/add-goods-edit?index=-1',
    })
  },
  onClickEdit: function(e) {
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var index = parseInt(idstring);
    wx.navigateTo({
      url: '../add-goods-edit/add-goods-edit?index=' + index ,
    })
  }
})