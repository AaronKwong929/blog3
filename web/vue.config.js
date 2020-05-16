const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'svg'];
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const path = require('path');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
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
                    '^/api': '',
                },
            },
        },
    },
    productionSourceMap: false,
    configureWebpack: (config) => {
        if (IS_PROD) {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240,
                    minRatio: 0.8,
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
                    logLevel: 'info',
                })
            );
            config.plugins.push(
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'],
                        },
                    },
                })
            );
            config.plugins.push(
                new HtmlWebpackExternalsPlugin({
                    externals: [
                        {
                            module: 'vue',
                            entry:
                                'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
                            global: 'Vue',
                        },
                        {
                            module: 'axios',
                            entry:
                                'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
                            global: 'axios',
                        },
                        {
                            module: 'vue-router',
                            entry:
                                'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
                            global: 'VueRouter',
                        },
                        {
                            module: 'lodash',
                            entry:
                                'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js',
                            global: '_',
                        },
                        {
                            module: 'highlight.js',
                            entry:
                                'https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js',
                            global: 'hljs',
                        },
                        {
                            module: 'marked',
                            entry:
                                'https://cdn.bootcss.com/marked/0.7.0/marked.min.js',
                            global: 'marked',
                        },
                        {
                            module: 'element-ui',
                            entry:
                                'https://unpkg.com/element-ui/lib/index.js',
                            global: 'ELEMENT',
                        },
                    ],
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
                'element-ui': 'ELEMENT',
            };
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@utils', path.join(__dirname, 'src/utils'))
            .set('@components', path.join(__dirname, 'src/components'))
            .set('@views', path.join(__dirname, 'src/views'))
            .set('@vuex', path.join(__dirname, 'src/vuex'))
            .set('@static', path.join(__dirname, 'src/static'))
            .set('@api', path.join(__dirname, 'src/api'));
    },
};
