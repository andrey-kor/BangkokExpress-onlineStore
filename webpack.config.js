const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development', 
    entry: './index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src/assets/lib'),
        }
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            //use: ['file-loader'],
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
            type: 'javascript/auto'
          }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html'
        }),
    ],
    
}