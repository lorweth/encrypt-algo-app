require('dotenv').config();
const { merge } = require('webpack-merge');
const common = require('./webpack/common.config');
const prod = require('./webpack/production.config');
const dev = require('./webpack/development.config');

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = IS_DEVELOPMENT ? merge([common, dev]) : merge([prod, common]);

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = {
//     entry: "./src/index.tsx",
//     output: { 
//         path: path.join(__dirname, "build"), 
//         filename: "index.bundle.js",
//         sourceMapFilename: "[name].js.map"
//     },
//     mode: process.env.NODE_ENV,
//     resolve: {
//         extensions: [".tsx", ".ts", ".js"],
//         alias: {
//             "src": path.resolve('./src')
//         }
//     },
//     devServer: { 
//         static: path.join(__dirname, "build"),
//         hot:true,
//         port: 3000,
//         historyApiFallback: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ["babel-loader"],
//             },
//             {
//                 test: /\.js$/,
//                 enforce: 'pre',
//                 use: ['source-map-loader'],
//             },
//             {
//                 test: /\.(ts|tsx)$/,
//                 exclude: /node_modules/,
//                 use: ["ts-loader"],
//             },
//             {
//                 test: /\.css$/,
//                 use: [ 'style-loader', 'css-loader' ]
//             },
//             {
//                 test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
//                 use: ["file-loader"],
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.join(__dirname, "public", "index.html"),
//         }),
//         new CopyPlugin({
//             patterns: [
//                 {from: "public/favicon.ico", to: ""},
//                 {from: "public/logo192.png", to: ""},
//                 {from: "public/logo512.png", to: ""},
//                 {from: "public/manifest.json", to: ""},
//             ]
//         }),
//     ],
// };