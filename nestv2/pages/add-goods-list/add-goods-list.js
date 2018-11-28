// pages/add-goods-list/add-goods-list.js
import { $wuxDialog } from '../../dist/wuxdist/index'

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
    for (var i = 0; i < this.data.addList.length; ++ i) {
      var checkCellTemp = "addList[" + i + "].checkCell"
      this.setData({
        [checkCellTemp]: this.data.checked
      })
    }
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
      url: '../add-goods-edit/add-goods-edit?index=' + index + '&name=' + this.data.addList[index].name + '&goodsName=' + this.data.addList[index].goodsName + '&code=' + this.data.addList[index].code + '&tips=' + this.data.addList[index].tips + '&color=' + this.data.addList[index].color + '&oldPrice=' + this.data.addList[index].oldPrice + '&amount=' + this.data.addList[index].amount + '&remark=' + this.data.addList[index].remark + '&send=' + this.data.addList[index].send + '&isPay=' + this.data.addList[index].isPay,
    })
  },
  onClickDelete: function(e) {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '是否删除',
      content: '确定删除商品信息吗?',
      onConfirm: confirm => {
        var tempList = this.data.addList;
        tempList = tempList.filter(item => item.checkCell === false)
        this.setData({
          addList: tempList
        })
      },
      onCancel: cancel => {
      },
    })

  },
  onClickCopy: function(e) {
    var tempList = [];
    for (var i = 0; i < this.data.addList.length; ++i) {
      if (this.data.addList[i].checkCell === true) {
        tempList.push(JSON.parse(JSON.stringify(this.data.addList[i])))
      }
    }

    console.log(tempList.length)
    for (var i = 0; i < tempList.length; ++i) {
      tempList[i].checkCell = false
    }
    console.log(this.data.addList[0].checkCell)
    this.setData({
      addList: this.data.addList.concat(tempList)
    })
  }
})