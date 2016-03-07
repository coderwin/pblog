var webpack = require('webpack');
module.exports = {
    entry: {
        index: "./pages/index.jsx",
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].bundle.js" 
    },
    module: {
        loaders: [{
            test: /\.js$/, 
            loader: 'babel', 
            exclude: /node_modules/ 
        },{
            test: /\.jsx$/, 
            loader: 'jsx-loader' 
        },{
            test: /\.css$/, 
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },{
            test: /\.(jpg|png)$/, 
            loader: "url"
        },{
            test: /\.scss$/, 
            loader: "style!css!sass"
        },{
            test: /\.json$/,
            loader: 'json-loader',
        },{
            test: /\.md$/,
            loader: 'raw-loader'
        },{
            test: /\.txt$/,
            loader: 'raw-loader'
        }]
    },resolve: {
        extensions: ['', '.js', '.jsx', '.md', '.txt']
    }
    ,plugins: [
        new ExtractTextPlugin("../css/[name].css")
    ]
};