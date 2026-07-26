const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Types.ObjectId, ref: "Category", required: true },
  province: { type: String, required: false },
  city: { type: String, required: false },
  district: { type: String, required: false },
  address: { type: String, required: false },
  coordinate: { type: [Number], required: true }, //51.215485487, 52.687524154
  images: { type: [String], required: false, default: [] },
});
const PostModel = model("post", PostSchema);
module.exports = PostModel;
