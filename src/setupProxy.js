const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );

  // You can add more proxies here for other paths/APIs
    // Proxy for requests starting with /images
  app.use(
      '/images',
      createProxyMiddleware({
          target: 'http://localhost:8081', // Replace example.com with the appropriate target URL
          changeOrigin: true,
      })
  );

  app.use('/posts/images', createProxyMiddleware({
    target: 'http://localhost:8081', // Adjusted target to be the base URL
    changeOrigin: true,
    pathRewrite: function (path, req) {
        // Remove "/posts" from the path and prepend "/images" to the remaining path
        return path.replace(/^\/posts\/images/, '/images');
    },
  }));
};
