//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
      console.log("app show");
  },
  onHide: function() {
      console.log("app hide");
  },
  getUserInfo: function(cb) {
      var tha= this;
      if(this.globalData.userInfo) {
        typeof cb=='function' && cd(this.globalData.userInfo);
      } else {
          // 调用登录接口
          wx.login({
              success: function(res) {
                  that.global.userInfo = res.userInfo;
                  typeof cd=='function' && cd(that.global.userInfo);
              }
          })
      }
  },
  getLocationInfo: function(cb) {
    var that = this;
    if(this.globalData.locationInfo) {
        cb(this.globalData.locationInfo)
    } else {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                that.globalData.locationInfo = res;
                cb(that.globalData.locationInfo);
            },
            fail: function() {
                console.log('获取地理坐标失败');
            },
            complete: function() {
                console.log('获取地理坐标完成');
            }
        })
    }
  },
  globalData: {
    userInfo: null,
    locationInfo:null
  }
})