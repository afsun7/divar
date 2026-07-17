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
    const option = await this.#model.find({}, {}, { sort: { _id: -1 } });
    return option;
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
}
module.exports = new OptionService();
