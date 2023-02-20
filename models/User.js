import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      trim: true,
      validate: function (value) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export default model("User", UserSchema);
