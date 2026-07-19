const { default: autoBind } = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const OptionModel = require("./option.model");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { OptionMessage } = require("./option.message");
const categoryService = require("../category/category.service");

class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }

  async create(optionDto) {
    const category = await this.#categoryService.checkExistById(
      optionDto.category,
    );

    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
    // اگر با استفاده از سواگر در form-urlencoded دیتا بفرستیم مقدار enum به صورت رشته در نظر میگیره این مورد با استفاده از اسپلیت برطرف میکنیم
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    }
    const option = await this.#model.create(optionDto);
    return option;
  }

  async find() {
    // در متد فایند اولی پارامترهایی که نیاز داریم دومی فیلتر و سومی مرتب کردن است از اخرین دیتا به اولین دیتا وارد شده مرتب میشود
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }

  async findById(id) {
    return await this.checkExistById(id);
  }
  async findByCategoryId(category) {
    return await this.#model.find({ category }, { __v: 0 });
  }
  async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    return options;
  }
  // جلوگیری کنیم از اینکه ادمین دیتای تکراری وارد کنه با دوبار کلیک نتواند دیتای تکراری وارد بشه
  async alreadyExistByCategoryAndKey(key, id) {
    const isExist = await this.#model.findOne({
      category: id,
      key,
    });

    if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }

  async checkExistById(id) {
    const option = await this.#model.findById(id);
    console.log(option);

    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return option;
  }
}
module.exports = new OptionService();
