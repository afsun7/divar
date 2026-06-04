const express = require("express");
const dotenv = require("dotenv");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
dotenv.config();
const main = async () => {
  const app = express();
  const port = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  swaggerConfig(app);
  app.use(mainRouter);
  app.listen(port, () => {
    console.log(`server:http://localhost:${port}`);
  });
};
main();
