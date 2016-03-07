// var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// module.exports = {
// 	entry: "./viewApp.jsx",
// 	output: {
// 		path: __dirname + "/public",
// 		filename: "bundle.js"
// 	},
// 	// 新添加的module属性
//     module: {
//         /*preLoaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'jsxhint'
//         }],*/
//         loaders: [
//             {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
//             {test: /\.jsx$/, loader: 'jsx-loader' },
//             /*{test: /\.css$/, loader: "style!css"},*/
//             {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
//             {test: /\.(jpg|png)$/, loader: 'url-loader'},/*?limit=8192*/
//             {test: /\.scss$/, loader: "style!css!sass"}
//         ]
//     }/*,
// 	plugins: [
// 	    new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         })
// 	]*/
//     ,plugins: [
//         new ExtractTextPlugin("./[name].css", {allChunks: true})
//     ]
// };


var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    /*entry: "./viewApp.jsx",
    output: {
        path: __dirname + "/public/js",
        filename: "bundle.js"
    },*/

    entry: {
        /*detail: "./pages/detail.jsx",
        login: "./pages/login.jsx",
        about: "./pages/about.jsx",
        list: "./pages/list.jsx",
        post: "./pages/post.jsx",
        todoapp: "./pages/todoapp.jsx",*/
        index: "./pages/index.jsx", //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出 
        /*home: "./pages/home.jsx",*/
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].bundle.js" 
    },
    // 新添加的module属性
    module: {
        /*preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jsxhint'
        }],*/
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            {test: /\.jsx$/, loader: 'jsx-loader' },
            /*{test: /\.css$/, loader: "style!css"},*/
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
        //When requiring, you don't need to add these extensions
        extensions: ['', '.js', '.jsx', '.md', '.txt']
    }/*,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]*/
    ,plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new ExtractTextPlugin("../css/[name].css")
    ]
};