const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, default: undefined },
  expiresIn: { type: Number, default: 0 },
});

const UserSchema = new Schema(
  {
    fullName: { type: String },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    otp: {
      type: OTPSchema,
    },

    verifyMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const UserModel = model("user", UserSchema);
module.exports = UserModel;
