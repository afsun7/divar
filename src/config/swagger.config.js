const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "divar-backend",
        description: "botostart nodejs course",
        version: "1.0.0",
      },
    },
    // مسیر api به این قسمت اضافه میکنیم
    apis: [],
  });
  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/", swaggerUi.serve, swagger);
};

module.exports = swaggerConfig;
