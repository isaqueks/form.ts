const path = require('path');

module.exports = {
    entry: './publicTs/index.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            include: [
                path.resolve(__dirname, './publicTs'), 
                path.resolve(__dirname, './src/shared')
            ]
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js/out')
    },
    resolve: {
        extensions: ['.ts']
    }
}