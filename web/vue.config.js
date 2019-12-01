const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'svg'];
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
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
    configureWebpack: config => {
        if (IS_PROD) {
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
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerHost: '127.0.0.1',
                    analyzerPort: 8889,
                    reportFilename: 'report.html',
                    defaultSizes: 'parsed',
                    openAnalyzer: true,
                    generateStatsFile: false,
                    statsFilename: 'stats.json',
                    statsOptions: null,
                    logLevel: 'info'
                })
            );
            config.plugins.push(
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    }
                })
            );
            config.externals = {
                vue: 'Vue',
                axios: 'axios',
                'vue-router': 'VueRouter',
                lodash: '_',
                vuex: 'Vuex',
                'highlight.js': 'hljs',
                marked: 'marked',
                'element-ui': 'ELEMENT'
            };
        }
    }
};
