let app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: app.globalData.hasLogin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  login: function() {
      let that = this;
      if(!app.globalData.hasLogin){
        wx.login({
            success: function(res) {
                app.globalData.hasLogin = true;
                that.setData({
                    hasLogin: true
                });
                console.log(that.update());
            }
        })
      }
  }


})