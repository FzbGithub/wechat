const app = getApp();
Page({
    data: {
        mapHeight: app.globalData.getSystemInfo.screenHeight,
        position: {
            longitude: '',
            latitude: ''
        },
        markers: [{
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园'
        }],
        controls: [{
            id: 0,
            iconPath: '/image/location.png',
            position: {
                left: app.globalData.getSystemInfo.windowWidth / 2 - 15,
                top: app.globalData.getSystemInfo.windowHeight / 2 - 30,
                width: 30,
                height: 30
            },
            clickable: true
        }, {
            id: 1,
            iconPath: '/image/icon_API_HL.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },
    onLoad: function (options) {

    },
    onReady: function () {
        var that = this;
        app.getLocationInfo(function (res) {
            that.setData({
                position: {
                    longitude: res.longitude,
                    latitude: res.latitude
                }
            })
        });
    },
    regionchange(e) {

    },
    controltap: function () {
        this.mapCtx = wx.createMapContext("map");
        this.mapCtx.moveToLocation();
    },
    translateMarker: function (longitude, latitude) {
        this.mapCtx = wx.createMapContext("map");
        this.mapCtx.translateMarker({
            markerId: 0,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: latitude,
                longitude: longitude,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    }

})