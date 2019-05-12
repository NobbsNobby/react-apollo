const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const cssModuleName = /\.m.css$/;

module.exports = {
    mode:      'development',
    devtool:   'cheap-eval-source-map',
    devServer: {
        contentBase: './dist',
        quiet:       true,
    },
    entry:  './src/index.js',
    output: {
        filename: 'index_bundle.js',
        path:     path.resolve(__dirname, './dist'),
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
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }, 'postcss-loader'
                ],
            },
            {
                test: cssModuleName,
                use:  [
                    { loader: 'style-loader' },
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
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
        })
    ],
};
