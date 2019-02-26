const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/client/')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', "css-loader"]
            },
            {
                test:/\.js/,
                use:['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};