const { Router } = require("express");
const optionController = require("./option.controller");
const ValidateObjectId = require("../../common/guard/validateObjectId.guard");

const router = Router();

router.post("/", optionController.create);
router.get("/", optionController.find);
router.get(
  "/by-category/:categoryId",
  ValidateObjectId,
  optionController.findByCategoryId,
);
router.get("/by-category-slug/:slug", optionController.findByCategorySlug);
router.get("/:id", ValidateObjectId, optionController.findById);
router.delete("/:id", ValidateObjectId, optionController.removeById);
router.put("/:id", ValidateObjectId, optionController.update);
module.exports = {
  optionRoutes: router,
};
