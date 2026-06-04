const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "divar-backend",
        description: "botostart nodejs course",
        version: "1.0.0",
      },
    },
    //برو داخل src/modules و هر فایل با پسوند .swagger.js را در هر سطحی از پوشه‌ها پیدا کن
    apis: ["./src/modules/**/*.swagger.js"],
  });
  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/", swaggerUi.serve, swagger);
};

module.exports = swaggerConfig;
