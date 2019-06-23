const path = require('path');
const fs = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = { mode: "development" }) => {
    return {
        entry: ["./index.js", "./src/styles/scss/app.scss", "./src/styles/css/app.css"],
        output: {
            path: path.resolve(__dirname, "public"),
            publicPath: "/",
            filename: "dist/[name].app.js",
            chunkFilename: "dist/[name].app.js"
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.s?[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                }
            ]
        },
        devtool: "eval",
        devServer: {
            https: true,
            host: "pokyworld.local",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Origin, X-Auth_Token, Authorization",
                "Access-Control-Allow-Credentials": "true" //just in case
            },
            cert: fs.readFileSync('/Volumes/Transcend/Drive/Projects/Active/react-lang-editor/ssl/pokyworld.local.crt'),
            key: fs.readFileSync('/Volumes/Transcend/Drive/Projects/Active/react-lang-editor/ssl/pokyworld.local.key'),
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            compress: true,
            port: 8443
        },
        plugins: [
            new MiniCssExtractPlugin({ // define where to save the file
                filename: 'dist/app.css'
            }),
        ]
    }
}