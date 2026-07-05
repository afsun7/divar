const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category" },
    parents: { type: [Types.ObjectId], ref: "Category", default: [] },
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    id: false,
  },
);
CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});
async function autoPopulate() {
  this.populate("children");
}
CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);
const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
