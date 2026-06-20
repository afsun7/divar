const { Router } = require("express");
const { authRoutes } = require("./modules/auth/auth.routes");
const { userRoutes } = require("./modules/user/user.routes");
const { categoryRoutes } = require("./modules/category/category.routes");

const mainRouter = Router();
mainRouter.use("/auth", authRoutes);
mainRouter.use("/user", userRoutes);
mainRouter.use("/category", categoryRoutes);
module.exports = mainRouter;
