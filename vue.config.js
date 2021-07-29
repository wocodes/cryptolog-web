const Dotenv = require('dotenv-webpack');

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Curacel HMO-Client Portal'
        }
    },
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    }
}