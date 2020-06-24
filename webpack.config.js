const path = require('path');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/frontend/main.tsx'),
    output: {
        path: path.resolve(__dirname, './src/static'), // TODO distにしたい
        filename: 'bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        extensions: ['.ts', '.tsx', '.js', 'scss']
    },
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/, /\.js$/],
                loader: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                          url: false,
                          sourceMap: true,
                          importLoaders: 2
                        },
                    },
                   {
                     loader: 'sass-loader',
                     options: {
                         sourceMap: true,
                     }
                   },
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new BabelMinifyPlugin(),
    ],
}

