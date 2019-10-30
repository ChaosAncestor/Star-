// 只能使用common.js  require
// 获取本地json文件

module.exports = {
	// 配置服务器
	devServer: {
		// 跨域api代理设置,TODO:跨域代理同样不会被打包到上架项目中,所以跨域api与真实服务保持一致
		//配置api代理服务器
		proxy: {
			"/ids": {
				target: "http://search.idol001.com",
				changeOrigin: true,
				pathRewrite: { // 路径重写
					'^/ids': ''
				}
			},
			"/api": {
				target: "http://data.idol001.com",
				changeOrigin: true,
				pathRewrite: { // 路径重写
					'^/api': ''
				}
			},
			"/msg": {
				target: "http://static.idol001.com",
				changeOrigin: true,
				pathRewrite: { // 路径重写
					'^/msg': ''
				}
			}
		}
	}
}
