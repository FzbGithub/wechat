//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        list: [
            { id: 'view', name: '视图容器', open: false, pages: ['view', 'scroll-view', 'swiper'] },
            { id: 'content', name: '基础内容', open: false, pages: ['text', 'icon', 'progress'] },
            { id: 'form', name: '表单组件', open: false, pages: ['button', 'checkbox', 'from', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea'] },
            { id: 'nav', name: '导航', open: false, pages: ['navigator'] },
            { id: 'media', name: '媒体组件', open: false, pages: ['image', 'audio', 'video'] },
            { id: 'map', name: '地图', open: false, pages: ['map'] },
            { id: 'canvas', name: '画布', open: false, pages: ['canvas'] },
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].open = !list[i].open;
            } else {
                list[i].open = false;
            }
        }
        this.setData({ list: list });
    },
    onLoad: function(option) {
        // 获取不到地理位置时，退出小程序
        console.log(app.globalData.ifCloseApp);
        if (app.globalData.ifCloseApp) {
            wx.navigateBack({
                delta: 1
            })
        }
    },
    onReady: function () {
        console.log("index onReady");
    },
    onShow: function () {
        console.log("index onShow");
    },
    onHide: function () {
        console.log("index onHide");
    },
    onUnload: function () {
        console.log("index onUnload");
    }
})
