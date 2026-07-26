const { Router } = require("express");
const ValidateObjectId = require("../../common/guard/validateObjectId.guard");
const postController = require("./post.controller");

const router = Router();

router.get("/create", postController.createPostPage);
// router.get("/", postController.find);
// router.get(
//   "/by-category/:categoryId",
//   ValidateObjectId,
//   postController.findByCategoryId,
// );
// router.get("/by-category-slug/:slug", postController.findByCategorySlug);
// router.get("/:id", ValidateObjectId, postController.findById);
// router.delete("/:id", ValidateObjectId, postController.removeById);
// router.put("/:id", ValidateObjectId, postController.update);
module.exports = {
  postRoutes: router,
};
