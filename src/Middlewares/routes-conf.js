const express = require("express");
// const ticketRouter = require("../Users/user-routes");
const userRouter = require("../Users/user-controller");
const onelinkRouter = require("../Controllers/onelink-controller");

const Routes = (app, prisma) => {
  const router = express.Router();

  router.use("/users", userRouter);
  router.use("/onelink", onelinkRouter);

  app.use("/", router);
};

module.exports = Routes;
