require('dotenv').config();

module.exports = {
    publicPath: 
      process.env.NODE_ENV === 'production' ? 
      '/abc-mobile-test/' : '/',
  };