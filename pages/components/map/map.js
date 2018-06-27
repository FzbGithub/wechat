const app = getApp();
Page({
    data: {
        position: {
            longitude: '113.324520',
            latitude: '23.099994'
        },
        markers: [{
            iconPath: "/image/location.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 30,
            height: 30
        }],
        controls: [{
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
    onLoad: function () {
        var that = this;
        app.getLocationInfo(function (locationInfo) {
            console.log(locationInfo);
            that.setData({
                position: {
                    longitude: locationInfo.longitude,
                    latitude: locationInfo.latitude
                },
                // 114.053369,22.642139
                markers: [{
                    iconPath: "/image/location.png",
                    id: 0,
                    latitude: locationInfo.latitude,
                    longitude: locationInfo.longitude,
                    width: 30,
                    height: 30
                }],
            })
            
        })
    },
    //获取中间点的经纬度，并mark出来
    getLngLat: function () {
        var that = this;
        this.mapCtx = wx.createMapContext("map");
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res);
                /* that.setData({
                    position: {
                        longitude: res.longitude,
                        latitude: res.latitude
                    },
                    markers: [
                        {
                            id: 0
                            , iconPath: "/image/location.png"
                            , longitude: res.longitude
                            , latitude: res.latitude
                            , width: 30
                            , height: 30
                        }
                    ]
                }) */
            }
        })
    },
    regionchange(e) {
        // 地图发生变化的时候，获取中间点，也就是用户选择的位置
        if (e.type == 'end') {
           this.getLngLat()
        }
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