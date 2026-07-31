const { default: autoBind } = require("auto-bind");
const postService = require("./post.service");
const { PostMessage } = require("./post.message");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { getAddressDetail } = require("../../common/utils/map");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      // GET /post/create?slug=react
      let { slug } = req.query;
      let match = { parent: null };
      let options = [];
      let category = null;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      return res.json({
        categories,
        category,
        options,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, nex) {
    try {
      const { title, content, lat, lng, category, amount, images, ...options } =
        req.body;
      const { province, city, district, address } = await getAddressDetail(
        lat,
        lng,
      );

      await this.#service.create({
        userId,
        title,
        amount,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        images,
        options,
        address,
        province,
        city,
        district,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
