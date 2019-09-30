// pages/search/search.js
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';

var util = require('./utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    tag:"search",
    startDate: '2018-01-01',
    endDate: '2018-09-01', 
    search:{
      normal:"../../goods.png",
      active:"../../goods_press.png"
    },
    input:{
      normal: "../../my.png",
      active: "../../my_press.png"
    },
    history_show:false,
    send: false,
    sendIcon:{
      normal: "../../send.png",
      active: "../../send_press.png"
    },
    pay: false,
    payIcon: {
      normal: "../../pay.png",
      active: "../../pay_press.png"
    },
    searchStorage:[],
    searchStorageName: [],
    value: '',
    nameValue: '',
    history_show_name: false,
    buttons: [
      {
      label: '录入商品',
        icon: "../../goods_float.png"
      }
    ],
    totalAmount:0,
    totalTips: 0,
    totalOldPrice: 0,
    totalCountPrice: 0,
    userTitle:'',
    userName:''
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 0) {
      wx.navigateTo({
        url: '../add-goods-list/add-goods-list',
      })
    }
  },
  onChangeFloadButton(e) {
    console.log('onChange', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentDate = new Date();
    var timestamp = Date.parse(currentDate);
    var minusDays = timestamp / 1000 - 7 * 24 * 60 * 60;
    var date = util.formatTime(currentDate);
    var minusDate = util.formatTime(new Date(minusDays * 1000));
    
    this.setData({
      startDate: minusDate,
      endDate: date,
      searchStorage: wx.getStorageSync('searchData'),
      searchStorageName: wx.getStorageSync('searchStorageName'),
      userTitle: wx.getStorageSync("userName").charAt(0).toUpperCase(),
      userName: wx.getStorageSync("userName")
    });

    var registryParam = {
      "ver": "1.0",
      "session":wx.getStorageSync("session")
    }
    wx.request({
      url: 'https://www.lywss.top/month/statistic',
      data: JSON.stringify(registryParam),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.statusCode != 200) {
          wx.setStorageSync("session", "")
          wx.navigateBack({
            delta: 1
          })
          return
        }
        this.setData({
          totalAmount: res.data.amount,
          totalTips: res.data.tips,
          totalOldPrice: res.data.oldPrice,
          totalCountPrice: res.data.countPrice
        })
      },
      fail: res => {
        wx.setStorageSync("session", "")
        wx.navigateBack({
          delta: 1
        })
        return
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

  onChange: function (event) {
    console.log(event.detail);
    if (event.detail == 0) {
      this.setData({
        tag : 'search'
      })
    } else {
      this.setData({
        tag: 'info'
      })
    }
  },
  inputChange: function(event) {
    console.log(event.detail);
    this.setData({
      value: event.detail
    })
  },
  inputChangeName: function (event) {
    console.log(event.detail);
    this.setData({
      nameValue: event.detail
    })
  },
  inputPre: function(event) {
    this.setData({
      history_show:true
    })
  }, 
  inputPreName: function (event) {
    this.setData({
      history_show_name: true
    })
  },
  inputDes: function(event) {
    console.log("1111")
    this.setData({
      history_show: false
    })
  }, 
  inputDesName: function (event) {
    console.log("1111")
    this.setData({
      history_show_name: false
    })
  },
  sendClick: function(event) {
    this.setData({
      send: !this.data.send
    })
  },
  payClick: function (event) {
    this.setData({
      pay: !this.data.pay
    })
  },
  addHistoryValue: function(value, storage, name) {
    if (value.trim() != '') {
      var tempList = [];
      console.log("this.data.searchStorageName" + storage)
      for (var i = 0; i < storage.length; i++) {
        var subTempList = storage[i];
        console.log("subTempList:" + subTempList)
        for (var j = 0; j < subTempList.length; j++) {
          tempList.push(subTempList[j]);
        }
      }
      console.log("tempList1:" + tempList.length)

      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i] == value.trim()) {
          tempList.splice(i, 1);
          break;
        }
      }
      if (tempList.length == 6) {
        tempList.pop();
        tempList.unshift(value.trim());
      } else {
        tempList.unshift(value.trim());
      }
      console.log("tempList2:" + tempList)
      var subList = []
      var resultList = []
      for (let i = 0; i < tempList.length; i++) {
        subList.push(tempList[i])
        if (i % 3 == 2) {
          resultList.push(subList);
          subList = [];
        }
      }
      if (subList.length !== 0) {
        resultList.push(subList)
      }
      if (name == 'searchStorageName') {
        this.setData({
          searchStorageName: resultList
        })
        wx.setStorageSync('searchStorageName', this.data.searchStorageName)        
      } else {
        this.setData({
          searchStorage: resultList
        })
        wx.setStorageSync('searchData', this.data.searchStorage)
      }
    }
  },
  searchResult: function(event) {
    console.log("======" + this.data.value.trim())
    this.addHistoryValue(this.data.value, this.data.searchStorage, 'searchStorage');
    this.addHistoryValue(this.data.nameValue, this.data.searchStorageName, 'searchStorageName');    
    
    wx.navigateTo({
      url: '../search-result/search-result?' + 'goodsName=' + this.data.value + '&name=' + this.data.nameValue  + '&send=' + this.data.send + '&pay=' + this.data.pay + '&startDate=' + this.data.startDate + '&endDate=' + this.data.endDate,
    })
  },
  bindStartDateChange: function(event) {
    this.setData({
      startDate: event.detail.value
    })
  },
  bindEndDateChange: function (event) {
    this.setData({
      endDate: event.detail.value
    })
  },
  onclickSearchHistoryButton: function(e) {
    var index = parseInt(e.currentTarget.id / 3);
    console.log(index)
    var item = this.data.searchStorage[index];
    var subIndex = e.currentTarget.id - index * 3;
    this.setData({
      value: item[subIndex]
    })
  },
  onclickSearchHistoryButtonName: function (e) {
    var index = parseInt(e.currentTarget.id / 3);
    console.log(index)
    var item = this.data.searchStorageName[index];
    var subIndex = e.currentTarget.id - index * 3;
    this.setData({
      nameValue: item[subIndex]
    })
  },
  onLoadSearchHistoryRecord: function() {
    console.log(wx.getStorageSync('searchData'));
  },
  onclearSearchHistory: function(e) {
    if (this.data.searchStorage.length == 0) {
      return;
    }
    Dialog.confirm({
      title: '确认',
      message: "是否删除历史数据?"
    }).then(() => {
      wx.removeStorageSync('searchData');
      this.setData({
        searchStorage: []
      })
    }).catch(() => {
    });

  },
  onclearSearchHistoryName: function (e) {
    if (this.data.searchStorageName.length == 0) {
      return;
    }
    Dialog.confirm({
      title: '确认',
      message: "是否删除历史数据?"
    }).then(() => {
      wx.removeStorageSync('searchStorageName');
      this.setData({
        searchStorageName: []
      })
    }).catch(() => {
    });

  },
  onClickLoginOut: function(e) {
    var loginOutParam = {
      "ver": "1.0",
      "object": {
        "userName": wx.getStorageSync("userName"),
        "ksid": wx.getStorageSync("session")
      }
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    })
    wx.request({
      url: 'https://www.lywss.top/loginout',
      data: JSON.stringify(loginOutParam),
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        if (res.data.code == 200) {
          Toast.success("退出登录成功!")
          wx.setStorageSync("session", "")
          wx.setStorageSync("userName", "")
          wx.hideLoading();
          let page = getCurrentPages();
          let prevPage = page[page.length - 2];
          prevPage.setData({
            loginErrorMessage: "",
            userName:"",
            password:"",
            code: ''
          })
          prevPage.setData({
            countDownNum: 60,
            btnText: '发送验证码',
            disabled: false
          })
          clearInterval(prevPage.data.timer);
          wx.navigateBack({
            delta: 1
          })
        } else {
          Toast.fail("退出失败!")

        }
      }
    })
  },
  onClickDetailInfo: function(e) {
    wx.navigateTo({
      url: '../detail-info/detail-info',
    })
  }
})