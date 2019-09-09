module.exports = {
  PORT: process.env.PORT || 3000,
  filmsPerPage: 10,
  mongoose: {
    url: process.env.NODE_ENV,
    options: {
      useNewUrlParser: true,
      promiseLibrary: global.Promise,
      poolSize: 5,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  }
};
