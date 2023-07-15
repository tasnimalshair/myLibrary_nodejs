const bookRouter = require("./bookRouter");

module.exports = (app) => {

  app.use("/books", bookRouter);
 
};

