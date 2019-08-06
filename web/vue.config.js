module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        https: false,
        open: true,  // 自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    }
};
