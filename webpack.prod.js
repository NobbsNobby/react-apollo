const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const cssModuleName = /\.m.css$/;

module.exports = {
    mode:   'production',
    entry:  './src/index.js',
    output: {
        path:     path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {},
                    }
                ],
            },
            {
                test:    /\.css$/,
                exclude: cssModuleName,
                use:     [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    'postcss-loader'
                ],
            },
            {
                test: cssModuleName,
                use:  [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:  'css-loader',
                        options: {
                            modules:        true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                    'postcss-loader'
                ],
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject:     false,
            template:   HtmlWebpackTemplate,
            appMountId: 'app',
            meta:       [
                {
                    name:    'viewport',
                    content: 'user-scalable=no, width=device-width, initial-scale=1',
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename:      '[name].css',
            chunkFilename: '[id].css',
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(false),
        })
        // new FaviconsWebpackPlugin({
        //   logo: "./public/favicon.png",
        //   prefix: "icons/",
        //   icons: {
        //     android: true,
        //     appleIcon: true,
        //     appleStartup: false,
        //     coast: false,
        //     favicons: true,
        //     firefox: false,
        //     opengraph: false,
        //     twitter: false,
        //     yandex: false,
        //     windows: false
        //   }
        // }),
        // new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    ],
};
