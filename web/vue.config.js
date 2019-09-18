const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'svg'];

module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        https: false,
        open: true, // 自动启动浏览器
        // 打包和上线版本需要注释proxy
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:3000', //设置调用的接口域名和端口
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    productionSourceMap: false,
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         return {
    //             plugins: [
    //                 new CompressionWebpackPlugin({
    //                     test: /\.js$|\.html$|\.css/,
    //                     threshold: 10240,
    //                     deleteOriginalAssets: false
    //                 })
    //             ]
    //         }
    //     }
    // },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
    }
};
