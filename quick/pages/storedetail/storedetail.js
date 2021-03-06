// pages/storedetail/storedetail.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: wx.getStorageSync("user").openid,
    fieldflag: false,
    dealflag: false,
    supplyflag: false,
    field: true,
    deal: true,
    supply: true,
    fieldimg: '../../image/officeAct.png',
    dealimg: '../../image/manager.png',
    supplyimg: '../../image/truck.png'
  },
  previewImage(e) {

    var img = e.target.dataset.img
    // console.log(img)
    wx.previewImage({
      urls: [img],
    })
  },
  protocol() {

    wx.redirectTo({
      url: '../protocol/protocol?' +
      'storeid=' + this.data.storeid +
      '&fielduser=' + this.data.fielduser +
      '&dealuser=' + this.data.dealuser +
      '&supplyuser=' + this.data.supplyuser +
      '&fieldstate=' + this.data.fieldstate +
      '&dealstate=' + this.data.dealstate +
      '&supplystate=' + this.data.supplystate +
      '&fieldperson=' + this.data.fieldperson +
      '&dealperson=' + this.data.dealperson +
      '&supplyperson=' + this.data.supplyperson
    })
  },
  queryfield(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/field/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          fielduser: result.openid,
          fieldperson: result.name,
          fieldmobile: result.phone,
          fieldaddress: result.address,
          fieldcomname: result.comname,
          fieldcomnum: result.comnum,
          fieldfee: result.fee,
          fieldpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          fieldpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2,
          fieldpreviewImg3: 'https://store.lianlianchains.com/images/' + result.img3
        })

        this.setData({
          field: true
        })

        this.itemshow(0)

      } else {

        this.setData({
          field: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querydeal(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/deal/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          dealuser: result.openid,
          dealperson: result.name,
          dealmobile: result.phone,
          dealaddress: result.address,
          dealpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          dealpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.setData({
          deal: true
        })

      } else {

        this.setData({
          deal: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querysupply(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/supply/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          supplyuser: result.openid,
          supplyperson: result.name,
          supplymobile: result.phone,
          supplyaddress: result.address,
          supplyclassify: result.goodtype,
          supplypreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          supplypreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.setData({
          supply: true
        })

      } else {

        this.setData({
          supply: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  tapitem(e) {

    var idx = e.target.dataset.idx
    this.itemshow(idx)
  },
  itemshow(idx) {

    console.log(idx)

    this.setData({
      fieldimg: (idx == 0) ? '../../image/officeAct.png' : '../../image/office.png',
      dealimg: (idx == 1) ? '../../image/managerAct.png' : '../../image/manager.png',
      supplyimg: (idx == 2) ? '../../image/truckAct.png' : '../../image/truck.png',
      fieldflag: (idx == 0 && this.data.field == true) ? true : false,
      dealflag: (idx == 1 && this.data.deal == true) ? true : false,
      supplyflag: (idx == 2 && this.data.supply == true) ? true : false
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.queryfield(options.field)
    this.querydeal(options.deal)
    this.querysupply(options.supply)

    this.setData({
      storeid: options.storeid,
      fieldstate: options.fieldstate,
      dealstate: options.dealstate,
      supplystate: options.supplystate,
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
    
    this.setData({
      user: wx.getStorageSync("user").openid
    })
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

  }
})