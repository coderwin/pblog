
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        detail: "./pages/detail.jsx",//RN APP 详情页使用
        about: "./pages/about.jsx",//RN APP about页使用
        /*login: "./pages/login.jsx",
        list: "./pages/list.jsx",
        post: "./pages/post.jsx",*/
        index: "./pages/index.jsx", //webapp 首页使用
        /*home: "./pages/home.jsx",*/
    },output: {
        path: __dirname + "/public/js",
        filename: "[name].bundle.js" 
    },module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            {test: /\.jsx$/, loader: 'jsx-loader' },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(jpg|png)$/, loader: "url"},
            {test: /\.scss$/, loader: "style!css!sass"},
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.md$/,
                loader: 'raw-loader'
            },{
                test: /\.txt$/,
                loader: 'raw-loader'
            }
        ]
    },resolve: {
        extensions: ['', '.js', '.jsx', '.md', '.txt']
    },plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("../css/[name].css"),
    ]
};