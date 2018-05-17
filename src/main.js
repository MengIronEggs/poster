// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import vueresource from 'vue-resource'
Vue.use(vueresource)
// import axios from 'axios'
// Vue.prototype.$http = axios;
import { AlertPlugin,LoadingPlugin} from 'vux'
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
FastClick.attach(document.body)

Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')

Vue.http.post('https://act.guoanfamily.com/openweixin/jsapi/getJsapiSignature?local_url=' + encodeURIComponent(location.href.split('#')[0]),
	{}).then(response => {
		wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: response.body.appid, // 必填，公众号的唯一标识
		timestamp: parseInt(response.body.timestamp), // 必填，生成签名的时间戳
		nonceStr: response.body.noncestr, // 必填，生成签名的随机串
		signature: response.body.signature, // 必填，签名，见附录1
		jsApiList: [
			'onMenuShareAppMessage',
			'onMenuShareTimeline'
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function () {
			// 2. 分享接口
			// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareAppMessage({
				title: '国安城市电子刊6月刊', //标题
				desc: '刘鑫总教你解读：EOD模式如何引领城乡一体化发展', //描述
				link: 'https://mt.guoanfamily.com/poster2/#/', //连接地址指打开分享时页面地址
				imgUrl: 'https://img.guoanfamily.com/poster/poster_index.jpg', //图片
				trigger: function (res) {
					// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				},
				success: function (res) {
				},
				cancel: function (res) {
				},
				fail: function (res) {
				}
			});
			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: '国安城市电子刊6月刊', //标题
				desc: '刘鑫总教你解读：EOD模式如何引领城乡一体化发展', //描述
				link: 'https://mt.guoanfamily.com/poster2/#/', //连接地址指打开分享时页面地址
				imgUrl: 'https://img.guoanfamily.com/poster/poster_index.jpg', //图片
				trigger: function (res) {
					// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				},
				success: function (res) {
				},
				cancel: function (res) {
				},
				fail: function (res) {
				}
			});
			wx.error(function (res) {
			});
		})
	}, response => {
		alert(err);
	})
