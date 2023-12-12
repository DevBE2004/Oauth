const auth = require("./auth");
const user = require("./user");
const initRouter = (app) => {
  app.use("/apis/auth", auth);
  app.use("/apis/user", user);
};
module.exports = initRouter;
