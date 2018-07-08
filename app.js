//app.js
App({
    onLaunch: function () {
        console.log("app onLaunch");
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
    onShow: function () {
        console.log("app show");
    },
    onHide: function () {
        console.log("app hide");
    },

    getUserInfo: function (cb) {
        var tha = this;
        if (this.globalData.userInfo) {
            typeof cb == 'function' && cd(this.globalData.userInfo);
        } else {
            // 调用登录接口
            wx.login({
                success: function (res) {
                    that.global.userInfo = res.userInfo;
                    typeof cd == 'function' && cd(that.global.userInfo);
                }
            })
        }
    },
    // 获取地理坐标
    getLocationInfo: function (cb) {
        var that = this;
        if (this.globalData.locationInfo) {
            typeof cb == 'function' && cb(this.globalData.locationInfo);
        } else {
            wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                    that.globalData.locationInfo = res;
                    typeof cb == 'function' && cb(that.globalData.locationInfo);
                },
                fail: function () {
                    wx.showModal({
                        title: '温馨提示',
                        content: '获取地理位置失败，请重新进入',
                        success: function (res) {
                            if (res.confirm) {
                                that.globalData.ifCloseApp= true;
                                wx.reLaunch({
                                    url: '/pages/index/index',
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    console.log("获取地理位置失败");

                }
            })
        }

    },
    globalData: {
        ifCloseApp: false,
        hasLogin: false,
        userInfo: null,
        locationInfo: null,
        getSystemInfo: wx.getSystemInfoSync()
    }
})