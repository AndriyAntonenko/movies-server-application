module.exports = {
  PORT: process.env.PORT || 3200,
  mongoose: {
    url: "mongodb://andrii:123qwe@ds149606.mlab.com:49606/webby-lab",
    options: {
      useNewUrlParser: true,
      promiseLibrary: global.Promise,
      poolSize: 5,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  }
};
