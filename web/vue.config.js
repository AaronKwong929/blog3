const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        https: false,
        open: true,  // 自动启动浏览器
        // 打包和上线版本需要注释proxy
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:3000', //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    },
};
