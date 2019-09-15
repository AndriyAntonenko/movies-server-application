module.exports = {
  PORT: process.env.PORT || 3002,
  filmsPerPage: 10,
  mongoose: {
    url: process.env.DB_URL,
    options: {
      useNewUrlParser: true,
      promiseLibrary: global.Promise,
      poolSize: 5,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  }
};
