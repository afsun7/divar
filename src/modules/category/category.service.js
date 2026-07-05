const { default: autoBind } = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const CategoryModel = require("./category.model");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.message");

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async find() {
    return await this.#model.find({});
  }
  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set([...existCategory.parents, existCategory._id]),
      ];
      // categoryDto.parents = [...existCategory.parents, existCategory._id];
    }
    if (categoryDto?.slug) {
      // slugify اگر در سلاگ مقادیر نامتعارف مانند درصد بود حذف کند
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExistBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }
    const category = await this.#model.create(categoryDto);
    return category;
  }
  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
  }
}
module.exports = new CategoryService();
