module.exports = {
	publicPath: './',
	configureWebpack: {
		devServer: {
			proxy: {
				'*': {
					target: 'http://mini-blog.com:31380', //设置你调用的接口域名和端口号 别忘了加http
					changeOrigin: true, //这里设置是否跨域
					secure: false,
					onProxyRes: function(proxyRes, req, res) {
						var cookies = proxyRes.headers['set-cookie'];
						var cookieRegex = /Path=\/cooco-admin/i;
						//修改cookie Path
						if (cookies) {
							var newCookie = cookies.map(function(cookie) {
								if (cookieRegex.test(cookie)) {
									return cookie.replace(cookieRegex, 'Path=/');
								}
								return cookie;
							});
							//修改cookie path
							delete proxyRes.headers['set-cookie'];
							proxyRes.headers['set-cookie'] = newCookie;
						}
					}
				}
			}
		}
	},
}
