const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".wasm"],
    },
    devServer: { static: path.join(__dirname, "build") },
    experiments: { asyncWebAssembly: true },
    devtool: 'source-map',
    // experiments: {
    //     asyncWebAssembly: true,
    //     layers: true,
    //     lazyCompilation: true,
    //     outputModule: true,
    //     syncWebAssembly: true,
    //     topLevelAwait: true,
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
            { 
                test: /\.js\.map$/, 
                loader: 'source-map' 
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};