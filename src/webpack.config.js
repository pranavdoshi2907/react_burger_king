const path = require('path')

module.exports = {
    node : 'development',
    entry : './src/index.js',
    output : {
        path :path.resolve(__dirname, 'dist') ,
        filename : 'bundle.js',
        publicPath : ''
    },
    devtool : 'cheap-module-eval-source-map'
}