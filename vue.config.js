const Dotenv = require('dotenv-webpack');

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Assetlog - Track &amp; increase your wealth the easy way'
        }
    },
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    }
}