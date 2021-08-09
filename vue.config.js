const Dotenv = require('dotenv-webpack');

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'AssetLog - Your Money Tracker'
        }
    },
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    }
}