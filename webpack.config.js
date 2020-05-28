const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv')
    .config({path: __dirname + '/.env'});
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        styles: './src/scss/main.scss',
        // polyfill : './src/js/polyfill.js',
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    // devtool: '#source-map',
    devtool: '#source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                        //options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: false,
                            minimize: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'pdf/',
                            publicPath: 'pdf/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'video/',
                            publicPath: 'video/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[contenthash].[ext]',
                            name: '[name].[ext]',
                            outputPath: 'polices/',
                            publicPath: 'polices/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    'absoluteRuntime': false,
                                    'corejs': false,
                                    'helpers': true,
                                    'regenerator': true,
                                    'useESModules': false
                                }
                            ],
                            [
                                '@babel/plugin-transform-modules-umd', {
                                'globals': {
                                    'es6-promise': 'Promise'
                                }
                            }
                            ],
                            [
                                "@babel/plugin-proposal-pipeline-operator",
                                {"proposal": "minimal"}
                            ]
                        ]
                    }
                }
            }
            /* {
             test: /\.(png|svg|jpg|gif)$/,
             use: ['file-loader']
             } */
        ]
    },
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'development',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                extractComments: true
            })
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ModernizrWebpackPlugin({
            htmlWebpackPlugin: true,
            minify: {
                output: {
                    comments: true,
                    beautify: false
                }
            }
        }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'process.env': dotenv.parsed
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                cache: true,
                compress: {
//          arrows         : false,
                    booleans: false,
//          cascade        : false,
                    collapse_vars: false,
                    comparisons: false,
//          computed_props : false,
                    hoist_funs: false,
                    hoist_props: false,
                    hoist_vars: false,
                    if_return: false,
                    inline: false,
                    join_vars: false,
                    keep_infinity: true,
                    loops: false,
                    negate_iife: false,
                    properties: false,
                    reduce_funcs: false,
                    reduce_vars: false,
                    sequences: false,
                    side_effects: false,
                    switches: false,
                    top_retain: false,
                    toplevel: false,
                    typeofs: false,
                    unused: false,

                    // Switch off all types of compression except those needed to convince
                    // react-devtools that we're using a production build
                    conditionals: true,
                    dead_code: true,
                    evaluate: true
                },
                mangle: true,
                parallel: true
            }
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {level: 9},
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }),
        new HtmlWebPackPlugin({
            template: './src/html/home-guest.html',
            filename: './views/home-guest.html',
            excludeChunks: ['server'],
            title: process.env.APP_NAME || 'Ipssi timer',
            minify: true,
            cache: true,
            meta: {
                description: process.env.APP_DESCRIPTION || '',
                keywords: process.env.APP_KEYWORDS || '',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new HtmlWebPackPlugin({
            template: './src/html/home-user.html',
            filename: './views/home-user.html',
            excludeChunks: ['server'],
            title: process.env.APP_NAME || 'Ipssi timer',
            minify: true,
            cache: true,
            meta: {
                description: process.env.APP_DESCRIPTION || '',
                keywords: process.env.APP_KEYWORDS || '',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new HtmlWebPackPlugin({
            template: './src/html/group.html',
            filename: './views/group.html',
            excludeChunks: ['server'],
            title: process.env.APP_NAME || 'Ipssi timer',
            minify: true,
            cache: true,
            meta: {
                description: process.env.APP_DESCRIPTION || '',
                keywords: process.env.APP_KEYWORDS || '',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        // new HtmlWebpackExcludeAssetsPlugin(),
        new HtmlWebpackChangeAssetsExtensionPlugin(),
        new webpack.EnvironmentPlugin({...process.env}),
        new webpack.HotModuleReplacementPlugin()
    ]
};
