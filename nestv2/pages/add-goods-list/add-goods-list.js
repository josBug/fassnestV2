// pages/add-goods-list/add-goods-list.js
import { $wuxDialog } from '../../dist/wuxdist/index'
import Toast from '../../dist/toast/toast';

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
      url: '../add-goods-edit/add-goods-edit?index=' + index + '&name=' + this.data.addList[index].name + '&goodsName=' + this.data.addList[index].goodsName + '&code=' + this.data.addList[index].code + '&tips=' + this.data.addList[index].tips + '&color=' + this.data.addList[index].color + '&oldPrice=' + this.data.addList[index].oldPrice + '&amount=' + this.data.addList[index].amount + '&remark=' + this.data.addList[index].remark + '&send=' + this.data.addList[index].send + '&isPay=' + this.data.addList[index].isPay + '&source=' + this.data.addList[index].source + '&pickIndex=' + this.data.addList[index].pickIndex + '&sellPrice=' + this.data.addList[index].sellPrice + '&selectList=' + JSON.stringify(this.data.addList[index].selectList),
    })
  },
  onClickDelete: function(e) {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '是否删除',
      content: '确定删除商品信息吗?',
      onConfirm: confirm => {
        wx.showLoading({
          title: '更新中...',
          mask: true
        })
        var tempList = this.data.addList;
        tempList = tempList.filter(item => item.checkCell === false)
        this.setData({
          addList: tempList
        })
        wx.hideLoading();
      },
      onCancel: cancel => {
      },
    })

  },
  onClickCopy: function(e) {
    wx.showLoading({
      title: '更新中...',
      mask: true
    })
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
    wx.hideLoading();
  },
  onClickSubmit: function(e) {
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '确定提交',
      content: '确定提交商品记录吗?',
      onConfirm: confirm => {

        var tempList = this.data.addList.filter(item => item.checkCell === true)
        if (tempList.length === 0) {
          Toast.fail('未选中任何要提交的栏目')
          return
        }
        wx.showLoading({
          title: '更新中...',
          mask: true
        })
        var resList = []
        for(var i = 0; i < tempList.length; ++ i) {
          for (var j = 0; j < tempList[i].selectList.length; ++ j) {
            var data = {
              goods: tempList[i].goodsName,
              code: tempList[i].code == null ? "" : tempList[i].code,
              color: tempList[i].color == null ? "" : tempList[i].color,
              amount: tempList[i].selectList[j].number,
              price: tempList[i].oldPrice,
              names: tempList[i].selectList[j].name,
              sellPrice: tempList[i].sellPrice,
              tip: tempList[i].tips,
              remark: tempList[i].remark == null ? "" : tempList[i].remark,
              send: tempList[i].send,
              isPay: tempList[i].isPay,
              source: tempList[i].source
            }
            resList.push(data)
          }
        }
        var param = {
          "ver": "1.0",
          "session": wx.getStorageSync("session"),
          "userName": "",
          "object": {
            "messages": resList
          }
        }

        wx.request({
          url: 'https://www.lywss.top/submit/json',
          data: JSON.stringify(param),
          header: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          method: "POST",
          success: res => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.setData({
                addList: this.data.addList.filter(item => item.checkCell === false)
              })
              Toast.success("提交成功")
              wx.hideLoading();
            } else {
              Toast.success("提交失败")
              wx.hideLoading();
            }
          },
          fail: res => {
            Toast.success("提交失败")
            wx.hideLoading();
          }
        })
      },
      onCancel: cancel => {
      },
    })
    
  }
})