const path = require('path');

module.exports = {  
  chainWebpack: config => {
    config.resolve.alias.set('@src', path.resolve(__dirname, './src'));
    config.resolve.alias.set('@api', path.resolve(__dirname, './src/api'));
    config.resolve.alias.set('@styles', path.resolve(__dirname, './src/assets/css'));
  }
};
