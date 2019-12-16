const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier');
const projectRoot = path.resolve(__dirname, '../')
var debug = process.env.NODE_ENV !== "production";
const JavaScriptObfuscator = require('webpack-obfuscator');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolvePath(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = [
    {
        entry: "./wwwroot/script/main.js",
        output: {
            filename: "./wwwroot/script/bundle.js"
        },
        devServer: {
            contentBase: ".",
            host: "localhost",
            port: 9000
        },
        resolve: debug ? {
            alias: {
                'vue$': "vue/dist/vue.js"
            }
        } : {
                alias: {
                    'vue$': "vue/dist/vue.esm.js"
                }
            },

        
        module: {

            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            'js': 'babel-loader',

                        }
                    }
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },

                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",                  
                    include: [
                        resolvePath('script'),                      
                    ]
                },
                {
                    test: /\.js$/,
                  
                    include: [
                        resolvePath('script'),                 
                      
                    ],
                    use: 'babel-loader',
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                        "image-webpack-loader?bypassOnDebug"
                    ]
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
                }, {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader"
                }, {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                }
            ]
            

        },
        plugins: debug ? [
            new WebpackNotifierPlugin({ alwaysNotify: true }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new webpack.ProvidePlugin({
                Raphael: "raphael",

            })
        ] : [
                new WebpackNotifierPlugin({ alwaysNotify: true }),
        
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery"
                }),

                new webpack.ProvidePlugin({
                    Raphael: "raphael",

                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                }),
                new UglifyJsPlugin({
                    uglifyOptions: {
                        mangle: true,

                        compress: {
                            warnings: false,drop_console: true, dead_code: true 
                        },
                        output: {
                         
                            beautify : false
                        }
                    },
                    sourceMap: true,
                    parallel: true
                }),
                new JavaScriptObfuscator({
                    rotateUnicodeArray: true
                }, ['bundle.js'])        
            ]
               

    }

]
