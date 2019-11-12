// pages/buyer-select/buyer-select.js
import { $wuxDialog } from '../../dist/wuxdist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      search: this.search.bind(this),
      searchFocus: this.searchFocus.bind(this),
      searchText:"",
      preSearchText:"",
      searchList: [],
      show:false,
      selectList: [{ name: '你好' }, { name: '你好' }, { name: '你好' }, { name: '你好' }, { name: '你好' }, { name: '你好' }],
      buttons: [
        {
          label: '新增',
          icon: "../../inputbuyer.png"
        },
        {
          label: '选择已有',
          icon: "../../selectbuyer.png"

        }
      ]
    })
  },
  search: function (value) {
    if (value == this.data.searchText) {
      return new Promise((resolve, reject) => {
        resolve(this.data.searchList)
      })
    }

    if (value == '') {
      return new Promise((resolve, reject) => {
        var param = {
          "ver": "1.0",
          "session": wx.getStorageSync("session"),
          "userName": "",
          "object": {
            "offset": 0,
            "limit": 100
          }
        }

        wx.request({
          url: 'http://127.0.0.1:8000/list/buyer',
          data: JSON.stringify(param),
          header: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          method: "POST",
          success: res => {
            var tempList = []
            for (var i = 0; i < res.data.length; ++i) {
              var data = {
                id: res.data[i].id,
                name: res.data[i].name,
                userId: res.data[i].userId,
                text: res.data[i].name,
                value: res.data[i].id
              }
              tempList.push(data)
            }
            this.setData({
              searchList: tempList
            })
            console.log(this.data.searchList)
            resolve(this.data.searchList)
          },
          fail: res => {
            console.log("fail")
            resolve(this.data.searchList)
          }
        })
      })
    }

    this.setData({
      searchText:value
    })
    
    return new Promise((resolve, reject) => {
      var param = {
        "ver": "1.0",
        "session": wx.getStorageSync("session"),
        "userName": "",
        "object": {
          "keyword": this.data.searchText,
          "offset": 0,
          "limit": 100
        }
      }

      wx.request({
        url: 'http://127.0.0.1:8000/search/buyer',
        data: JSON.stringify(param),
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        method: "POST",
        success: res => {
          var tempList = []
          for (var i = 0; i < res.data.length; ++i) {
            var data = {
              id: res.data[i].id,
              name: res.data[i].name,
              userId: res.data[i].userId,
              text: res.data[i].name,
              value: res.data[i].id
            }
            tempList.push(data)
          }
          this.setData({
            searchList: tempList
          })
          resolve(this.data.searchList)
        }
      })
      
    })
  },
  inputSearch: function(e) {
  },
  searchFocus: function() {

    return new Promise((resolve, reject) => {
      var param = {
        "ver": "1.0",
        "session": wx.getStorageSync("session"),
        "userName": "",
        "object": {
          "offset": 0,
          "limit": 100
        }
      }

      wx.request({
        url: 'http://127.0.0.1:8000/list/buyer',
        data: JSON.stringify(param),
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        method: "POST",
        success: res => {
          var tempList = []
          for (var i = 0; i < res.data.length; ++i) {
            var data = {
              id: res.data[i].id,
              name: res.data[i].name,
              userId: res.data[i].userId,
              text: res.data[i].name,
              value: res.data[i].id
            }
            tempList.push(data)
          }
          this.setData({
            searchList: tempList
          })
          console.log(this.data.searchList)
          resolve(this.data.searchList)
        },
        fail: res => {
          console.log("fail")
          resolve(this.data.searchList)
        }
      })
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  select: function(e) {
    
  },
  onClose: function(e) {
    this.setData({
      show:false
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
  onChangeFloadButton: function(e) {

  },
  onClickFload: function(e) {
    console.log(e.detail)
    if (e.detail.index == 0) {
      $wuxDialog().prompt({
        resetOnClose: true,
        title: '新增买家',
        content: "请输入买家名，不包含特殊字符，表情符号",
        fieldtype: 'text',
        password: 0,
        defaultText: '',
        placeholder: '',
        maxlength: 30,
        onConfirm: (e, response) => {
          console.log(response)
          var param = {
            "ver": "1.0",
            "session": wx.getStorageSync("session"),
            "userName": "",
            "object": {
              "name": response
            }
          }
          
          wx.request({
            url: 'http://127.0.0.1:8000/add/buyer',
            data: JSON.stringify(param),
            header: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            method: "POST",
            success: res => {
              var tempList = this.data.selectList
              var temp = {
                id: res.data.id,
                name: res.data.name,
                userId: res.data.userId,
                text: res.data.name,
                value: res.data.id
              }
              tempList.push(temp)
              console.log(tempList)
              this.setData({
                selectList: tempList
              })
              let page = getCurrentPages();
              let prevPage = page[page.length - 2];
              prevPage.setData({
                selectList: tempList
              })
            }
          })
        },
      })
      return
    }
    this.setData({
      show: true
    })
  }
})