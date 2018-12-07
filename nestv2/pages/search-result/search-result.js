// pages/search/search-result.js
import Toast from '../../dist/toast/toast';
import { $wuxDialog } from '../../dist/wuxdist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoad: true,
    list: [],
    loadMore:true,
    showLoadIcon: false,
    items: [{
      type: 'radio',
      label: '全选',
      value: 'is-send',
      children: [
      {
        label: '发货',
        value: 'send',
      },
      {
        label: '未发货',
        value: 'notsend',
      },
      ],
      groups: ['001'],
    },
    {
      type: 'radio',
      label: '全选',
      value: 'is-pay',
      children: [
      {
        label: '付款',
        value: 'pay',
      },
      {
        label: '未付款',
        value: 'notpay',
      },
      ],
      groups: ['002'],
    },
    {
      type: 'sort',
      label: '创建时间',
      value: 'createTime',
      groups: ['003'],
    }
    // , 
    // {
    //     type: 'filter',
    //     label: '综合选择',
    //     value: 'filter',
    //     children:[{
    //       type: 'radio',
    //       label: '是否发货',
    //       value: 'is-send-filter',
    //       children: [
    //       {
    //         label: '发货',
    //         value: 'send-filter',
    //       },
    //       {
    //         label: '未发货',
    //         value: 'notsend-filter',
    //       }
    //       ]
    //     },{
    //       type: 'radio',
    //       label: '是否付款',
    //       value: 'is-pay-filter',
    //       children: [
    //       {
    //         label: '付款',
    //         value: 'pay-filter',
    //       },
    //       {
    //         label: '未付款',
    //         value: 'notpay-filter'
    //       },
    //       ]
    //     }
    //    ],
    //   groups: ['001', '002', '003'],
    // }
    ],
    buttons: [
      {
        label: '向上',
        icon: "../../up.png"
      },
      {
        label: '全选',
        icon: "../../allpicker.png"

      },
      {
        label: '已发货',
        icon: "../../allsend.png"

      },
      {
        label: '已支付',
        icon: "../../allpay.png"

      },
      {
        label: '待发货',
        icon: "../../allnotsend.png"

      },
      {
        label: '待支付',
        icon: "../../allnotpay.png"

      },
      {
        label: '关联快递',
        icon: "../../scancode1.png"

      }
    ],
    goodsName:'',
    name:'',
    isPay:false,
    isSend:false,
    startTime:'',
    endTime:'',
    sort:'asc',
    popShow: false,
    statictisButtonVisible: false,
    countPrices:0.0,
    oldPrices:0.0,
    tips:0.0,
    amounts:0,
    clickSelected:false
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log('options:' + options.send)
    this.setData({
      goodsName: options.goodsName,
      name: options.name,
      isSend: options.send === 'true' ? true : false,
      isPay: options.pay === 'true' ? true : false,
      startTime: options.startDate,
      endTime: options.endDate
    });
    var sendTemp = "items[" + 0 + "].label"
    var payTemp = "items[" + 1 + "].label"
    this.setData({
      [sendTemp]: options.send === 'true'?'发货':'未发货',
      [payTemp]: options.pay === 'true' ? '付款' : '未付款'      
    })
    var param = {
      "id":0,
      "type":"reset",
      "sense":"start"
    }
    this.getList(param);
  },
  hideLoad:function() {
    this.setData({
      showLoad: false,
      clickSelected:false
    })
  },
  showLoadBar: function () {
    this.setData({
      showLoad: true
    })
  },
  getList:function(param) {
    if (param.sense == 'delete' || param.sense == 'edit') {
      this.getStatistic(search);      
      return;
    }
    if (param.sense == 'loadMore') {
      console.log("========================this.data.showLoadIcon:" + this.data.list.length + this.data.showLoadIcon)
      if (!this.data.loadMore || this.data.showLoadIcon) {
        return;
      }
      
      this.setData({
        showLoadIcon: true
      })
      console.log("++++++++++++++++this.data.showLoadIcon:" + this.data.list.length + this.data.showLoadIcon)      
    } else if (param.sense == 'start') {
      this.showLoadBar()
    }
    
    var search = {
      "ver": "1.0",
      "session": wx.getStorageSync("session"),
      "userName": "",
      "object": {
        "goodsName": this.data.goodsName,
        "name": this.data.name,
        "id": param.id,
        "isPay": this.data.isPay === true ? 1 : 0,
        "isSend": this.data.isSend === true ? 1 : 0,
        "startTime": this.data.startTime + " " + "00:00:00",
        "endTime": this.data.endTime + " " + "23:59:59",
        "sort": this.data.sort
      }
    }
    wx.request({
      url: 'https://www.lywss.top/search/app',
      data: JSON.stringify(search),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        var tempList = [];
        for (var i = 0; i < res.data.length; ++i) {
          var data = {
            "id": res.data[i].id,
            "goodsName": res.data[i].goodsName,
            "code": res.data[i].code,
            "color": res.data[i].color,
            "amount": res.data[i].amount,
            "oldPrice": res.data[i].oldPrice,
            "name": res.data[i].name,
            "tip": res.data[i].tip,
            "send": res.data[i].send,
            "countPrice": res.data[i].countPrice,
            "isPay": res.data[i].isPay,
            "remark": res.data[i].remark == '' ? '空' : res.data[i].remark,
            "userName": res.data[i].userName,
            "source": res.data[i].source == '' ? '空' : res.data[i].source,
            "createAt": res.data[i].createAt,
            "updateAt": res.data[i].updateAt,
            "checked": false,
            "editStart": false,
            "editClick": false,
            "clickCard": false,
            "isDelete": false,
            "clickRadio": false,
            "clickScanCode": false,
            "startExpress": false,            
            "clickExpress":false,
            "expressCode": res.data[i].expressCode == '' ? '空' : res.data[i].expressCode,
          }
          tempList.push(data)
        }
        if (param.type == 'reset') {
          this.setData({
            list: tempList
          })
        } else {
          console.log(this.data.list.concat(tempList))            
          this.setData({
            list: this.data.list.concat(tempList)
          })
        }

        if (param.sense == 'start') {
          this.hideLoad();
          this.getStatistic(search);          
          if (tempList.length < 10) {
            this.setData({
              loadMore: false,
              showLoadIcon: true
            })
          } else {
            this.setData({
              loadMore: true,
              showLoadIcon: false              
            })
          }
        } else if (param.sense == 'refresh') {
          wx.stopPullDownRefresh() //停止下拉刷新
          if (tempList.length < 10) {
            this.setData({
              loadMore: false,
              showLoadIcon: true
            })
          } else {
            this.setData({
              loadMore: true,
              showLoadIcon: false              
            })
          }
          this.getStatistic(search);                    
        } else if (param.sense == 'loadMore') {
          if (tempList.length < 10) {
            this.setData({
              loadMore: false
            })
            return
          }
          this.setData({
            showLoadIcon: false
          })
        }
        
      }
    })
  },
  getStatistic: function(param) {
    wx.request({
      url: 'https://www.lywss.top/search/statictis',
      data: JSON.stringify(param),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",      
      success: res => {
        console.log(res.data);
        this.setData({
          countPrices: res.data.countPrices,
          tips: res.data.tips,
          amounts: res.data.amounts,
          oldPrices: res.data.oldPrices
        })
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function() {
    console.log("++++++++++++")
    var param = {
      "id": 0,
      "type": "reset",
      "sense": "refresh"
    }
    this.getList(param);
  },
  onReachBottom: function() {
    console.log("down")
    var param = {
      "id": this.data.list[this.data.list.length - 1].id,
      "type": "append",
      "sense": "loadMore"
    }
    this.getList(param);
  },
  onChangeFilterBar: function(e) {
    console.log(e)
    this.setData({
      clickSelected:true
    })
    for (var i = 0; i < e.detail.checkedItems.length; ++ i) {
      var checkList = e.detail.checkedItems[i];
      if (checkList.value === 'is-send') {
        if (checkList.checked) {
          for (var j = 0; checkList.children.length; ++j) {
            if (checkList.children[j].checked) {
              var labalTemp = "items[" + 0 + "].label"
              this.setData({
                [labalTemp]: checkList.children[j].label,
                isSend: checkList.children[j].value === 'send' ? true : false
              })
              break;
            }
          }
        }


      } else if (checkList.value === 'is-pay') {
        if (checkList.checked) {
          for (var j = 0; checkList.children.length; ++j) {
            if (checkList.children[j].checked) {
              var labalTemp = "items[" + 1 + "].label"
              this.setData({
                [labalTemp]: checkList.children[j].label,
                isPay: checkList.children[j].value === 'pay' ? true : false
              })
              break;
            }
          }
        }    

      } else if (checkList.value === 'createTime') {
        if (checkList.checked) {
          if (checkList.sort <= 0) {
            var labalTemp = "items[" + 2 + "].sort"
            this.setData({
              sort: 'desc'
            })
          } else {
            this.setData({
              sort: 'asc'
            })
          }
        }        

      } else if (checkList.value === 'filter') {
        if (checkList.checked) {
          for (var j = 0; j < checkList.children.length; ++j) {
            if (checkList.children[j].value === 'is-send-filter') {
              for (var m = 0; m < checkList.children[j].children.length; ++m) {
                var sendCheck = checkList.children[j].children[m];
                console.log(sendCheck)
                if (sendCheck.checked) {
                  this.setData({
                    isSend: sendCheck.value === 'send-filter' ? true : false
                  })
                  break;
                }
              }
            } else if (checkList.children[j].value === 'is-pay-filter') {
              for (var m = 0; m < checkList.children[j].children.length; ++m) {
                var payChecked = checkList.children[j].children[m];
                if (payChecked.checked) {
                  this.setData({
                    isPay: payChecked.value === 'pay-filter' ? true : false
                  })
                  break;
                }
              }
            }
          }
        }        
      }
      var param = {
        "id": 0,
        "type": "reset",
        "sense": "start"
      }
      this.getList(param)
    }
    
  },
  onOpenFilterBar: function (e) {
    console.log(e)
  },
  onCloseFilterBar: function (e) {
    console.log(e)
  },
  onSelected: function(e) {
    console.log(e)
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    console.log(id)
    var clickRadioTemp = "list[" + id + "].clickRadio"   
    var clickCardTemp = "list[" + id + "].clickCard"         
    this.setData({
      [clickRadioTemp]: true,
      [clickCardTemp]: !this.data.list[id].clickCard
    })
  },
  onEditStart:function(e) {
    console.log("start")
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var editStartTemp = "list[" + id + "].editStart"
    var editClickTemp = "list[" + id + "].editClick"  
    this.setData({
      [editStartTemp]:true,
      [editClickTemp]:true
    })
  },
  onEditEnd: function(e) {
    console.log("end")
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var editStartTemp = "list[" + id + "].editStart"
    this.setData({
      [editStartTemp]: false
    })
    var tempRemark = this.data.list[id].remark === '空' ? '' : this.data.list[id].remark;
    var tempSource = this.data.list[id].source === '空' ? '' : this.data.list[id].source;
    wx.navigateTo({
      url: '../edit/edit?name=' + this.data.list[id].name + '&goodsName=' + this.data.list[id].goodsName + '&code=' + this.data.list[id].code + '&tips=' + this.data.list[id].tip + '&color=' + this.data.list[id].color + '&oldPrice=' + this.data.list[id].oldPrice + '&numbers=' + this.data.list[id].amount + '&id=' + this.data.list[id].id + '&remark=' + tempRemark + '&index=' + id + '&source=' + tempSource,
    })
  },
  onExpressClickStart: function (e) {
    console.log("start")
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var expressStartTemp = "list[" + id + "].startExpress"
    var expressClickTemp = "list[" + id + "].clickExpress"
    this.setData({
      [expressStartTemp]: true,
      [expressClickTemp]: true
    })
  },
  onExpressClickEnd: function (e) {
    console.log("end")
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var expressStartTemp = "list[" + id + "].startExpress"
    this.setData({
      [expressStartTemp]: false
    })
    if (this.data.list[id].expressCode === '空') {
      return
    }
    wx.showActionSheet({
      itemList: ['复制单号', '编辑快递单号'],
      success:res=> {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.setClipboardData({
            data: this.data.list[id].expressCode,
            success:r=> {
            }
          })
        } else if (res.tapIndex == 1){
          $wuxDialog().prompt({
              resetOnClose: true,
              title: '编辑单号',
              content: "单号只能为数字",
              fieldtype: 'number',
              password: 0,
              defaultText: this.data.list[id].expressCode,
              placeholder: '',
              maxlength: 30,
              onConfirm:(e, response)=> {
                console.log(response)
                if (response === this.data.list[id].expressCode) {
                  return
                } else {
                  var ids = [];
                  var index = [];
                  ids.push(this.data.list[id].id)
                  index.push(id)
                  var param = {
                    "ver": "1.0",
                    "session": wx.getStorageSync("session"),
                    "userName": "",
                    "object": {
                      "ids": ids,
                      "expressCode": response
                    }
                  }
                  if (index.length === 0) {
                    return
                  }
                  this.updateExpressBatch(param, index, response)
                }
              },
            })
        }
      }
    })
  },
  updateExpressBatch: function(param, index, code) {
    wx.showLoading({
      title: '更新中...',
      mask:true
    })
    wx.request({
      url: 'https://www.lywss.top/update/batch/express',
      data: JSON.stringify(param),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code === 200) {
          for (var i = 0; i < index.length; ++ i) {
            var expressCodeTemp = "list[" + index[i] + "].expressCode"
            this.setData({
              [expressCodeTemp]: code == '' ? '空' : code
            })
          }
        }
        wx.hideLoading();
      }
    })
  },
  onClickCard: function(e) {
    console.log(e)
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    console.log(id)
    
    var editClickTemp = "list[" + id + "].editClick"    
    if (this.data.list[id].editClick) {
      this.setData({
        [editClickTemp]: false
      })
      return
    }
    var clickExpressTemp = "list[" + id + "].clickExpress"
    if (this.data.list[id].clickExpress) {
      this.setData({
        [clickExpressTemp]: false
      })
      return
    }
    var clickScanCodeTemp = "list[" + id + "].clickScanCode"        
    if (this.data.list[id].clickScanCode) {
      this.setData({
        [clickScanCodeTemp]: false
      })
      return
    }
    var isDeleteTemp = "list[" + id + "].isDelete"        
    if (this.data.list[id].isDelete) {
      this.setData({
        [isDeleteTemp]: false
      })
      return
    }
    var clickRadioTemp = "list[" + id + "].clickRadio"    
    if (this.data.list[id].clickRadio) {
      this.setData({
        [clickRadioTemp]: false
      })
      return
    }
    
    var clickCardTemp = "list[" + id + "].clickCard"
    this.setData({
      [clickCardTemp]: !this.data.list[id].clickCard
    })
    console.log(this.data.list[id].clickCard)
  },
  onClickFloatButton: function(e) {
    console.log(e)
    this.operatePop()
  },
  onChangeFloadButton: function(e) {
    console.log(e)

  },
  onClickFload: function(e) {
    console.log(e)
    if (e.detail.index == 0) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    } else if (e.detail.index == 1) {
      wx.showLoading({
        title: '操作中',
        mask: true
      })
      if (e.detail.value.label === '全选') {
        for (var i = 0; i < this.data.list.length; ++i) {
          var clickCardTemp = "list[" + i + "].clickCard"
          this.setData({
            [clickCardTemp]: true
          })
        }
        var buttonTempLabel = "buttons[" + 1 + "].label"
        var buttonTempIcon = "buttons[" + 1 + "].icon"
        this.setData({
          [buttonTempLabel]: "取消全选",
          [buttonTempIcon]: "../../allcancel.png"
          
        })
      } else {
        for (var i = 0; i < this.data.list.length; ++i) {
          var clickCardTemp = "list[" + i + "].clickCard"
          this.setData({
            [clickCardTemp]: false
          })
        }
        var buttonTempLabel = "buttons[" + 1 + "].label"
        var buttonTempIcon = "buttons[" + 1 + "].icon"
        this.setData({
          [buttonTempLabel]: "全选",
          [buttonTempIcon]: "../../allpicker.png"
        })
      }
      wx.hideLoading()
      

    } else if (e.detail.index == 2 
      || e.detail.index == 3
      || e.detail.index == 4
      || e.detail.index == 5) {
      var pickList = [];
      var ids = [];
      for (var i = 0; i < this.data.list.length; ++ i) {
        if (this.data.list[i].clickCard) {
          console.log(this.data.list[i])
          var temp = {
            index : i,
            id: this.data.list[i].id
          }
          ids.push(this.data.list[i].id)
          pickList.push(temp)
        }
      }
      if (ids.length === 0) {
        return
      }
      var batchType, value;
      if (e.detail.index == 2) {
        batchType = "SEND";
        value = 1;
      } else if (e.detail.index == 3) {
        batchType = "PAY";
        value = 1;
      } else if (e.detail.index == 4) {
        batchType = "SEND";
        value = 0;
      } else if (e.detail.index == 5) {
        batchType = "PAY";
        value = 0;
      }
      var data = {
        "ver": "1.0",
        "session": wx.getStorageSync("session"),
        "userName": "",
        "object": {
          "ids": ids,
          "batchType": batchType,
          "value": value
        }
      }
      this.updateOperator(data, pickList, e.detail.index);
    } else if (e.detail.index == 6) {
      this.onclickScanCode()
    }
  },
  updateOperator: function (param, pickList, index) {
    wx.showLoading({
      title: '更新中',
      mask:true
    })
    wx.request({
      url: 'https://www.lywss.top/update/batch/operator',
      data: JSON.stringify(param),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code == 200) {
          if (index === 2) {
            for (var i = 0; i < pickList.length; ++i) {
              var listTemp = "list[" + pickList[i].index + "].send";
              var listTempClickCard = "list[" + pickList[i].index + "].clickCard";              
              this.setData({
                [listTemp]:1,
                [listTempClickCard]:false
              })
            }
          } else if (index === 3) {
            for (var i = 0; i < pickList.length; ++i) {
              var listTemp = "list[" + pickList[i].index + "].isPay";
              var listTempClickCard = "list[" + pickList[i].index + "].clickCard";
              this.setData({
                [listTemp]: 1,
                [listTempClickCard]: false
              })
            }
          } else if (index === 4) {
            for (var i = 0; i < pickList.length; ++i) {
              var listTemp = "list[" + pickList[i].index + "].send";
              var listTempClickCard = "list[" + pickList[i].index + "].clickCard";
              this.setData({
                [listTemp]: 0,
                [listTempClickCard]: false
              })
            }
          } else if (index === 5) {
            for (var i = 0; i < pickList.length; ++i) {
              var listTemp = "list[" + pickList[i].index + "].isPay";
              var listTempClickCard = "list[" + pickList[i].index + "].clickCard";
              this.setData({
                [listTemp]: 0,
                [listTempClickCard]: false
              })
            }
          }

          var buttonTempLabel = "buttons[" + 1 + "].label"
          var buttonTempIcon = "buttons[" + 1 + "].icon"
          this.setData({
            [buttonTempLabel]: "全选",
            [buttonTempIcon]: "../../allpicker.png"
          })
        }
        wx.hideLoading()        
      }
    })
  },
  onClosePop: function(e) {
    this.operatePop()
  },
  onclickScanCode: function() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: res=> {
        console.log(res)
        if (res.errMsg === 'scanCode:ok') {
          var code = res.result;
          var ids = [];
          var index = [];
          for (var i = 0; i < this.data.list.length; ++i) {
            if (this.data.list[i].clickCard) {
              ids.push(this.data.list[i].id)
              index.push(i)
            }
          }
          if (index.length === 0) {
            return
          }
          var param = {
            "ver": "1.0",
            "session": wx.getStorageSync("session"),
            "userName": "",
            "object": {
              "ids": ids,
              "expressCode": code
            }
          }
          this.updateExpressBatch(param, index, code)

        }
      }
    })
  },
  onSingleclickScanCode: function(e) {
    // 允许从相机和相册扫码
    console.log(e)
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var clickExpressTemp = "list[" + id + "].clickExpress"
    this.setData({
      [clickExpressTemp]: true
    })
    console.log(id)
    wx.scanCode({
      success: res => {
        console.log(res)
        if (res.errMsg === 'scanCode:ok') {
          var code = res.result;
          var index = []
          var ids = []
          ids.push(this.data.list[id].id)
          index.push(id)
          var param = {
            "ver": "1.0",
            "session": wx.getStorageSync("session"),
            "userName": "",
            "object": {
              "ids": ids,
              "expressCode": code
            }
          }
          if (index.length === 0) {
            return
          }
          this.updateExpressBatch(param, index, code)
        }
      }
    })
  },
  operatePop: function() {
    this.setData({
      popShow: !this.data.popShow,
      statictisButtonVisible: !this.data.statictisButtonVisible
    })
  },
  onDeleteClick: function(e) {
    var spliceId = e.currentTarget.id;
    var typeId = spliceId.split(":")[0];
    var idstring = spliceId.split(":")[1];
    var id = parseInt(idstring);
    var isDeleteTemp = "list[" + id + "].isDelete"
    this.setData({
      [isDeleteTemp]:true
    })
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '是否删除',
      content: '确定删除入库信息吗?',
      onConfirm:confirm=> {
        var ids = []
        ids.push(this.data.list[id].id)
        var param = {
          "ver": "1.0",
          "session": wx.getStorageSync("session"),
          "userName": "",
          "object": {
            "ids": ids
          }
        }
        wx.request({
          url: 'https://www.lywss.top/delete/batch',
          data: JSON.stringify(param),
          header: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          method: "POST",
          success: res => {
            console.log(res.data);
            if (res.data.code === 200) {
              var tempList = this.data.list;
              tempList.splice(id, 1);
              this.setData({
                list: tempList
              })
              Toast.success('删除成功')
            }
          }
        })
      },
      onCancel:cancel=> {
      },
    })

  }
})