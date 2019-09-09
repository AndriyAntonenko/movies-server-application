module.exports = {
  PORT: process.env.PORT || 3002,
  filmsPerPage: 10,
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
