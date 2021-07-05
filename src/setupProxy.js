const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://what-i-ve-learned-backend.herokuapp.com",
      changeOrigin: true,
    })
  );
};