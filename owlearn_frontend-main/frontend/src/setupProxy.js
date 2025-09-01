const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.39.6.242:8080/api",
      changeOrigin: true,
    })
  );

  app.use(
    "/image-proxy/images",
    createProxyMiddleware({
      target: "http://3.39.6.242:8080/images",
      changeOrigin: true,
      pathRewrite: {
        "^/image-proxy": "",
      },
    })
  );
};
