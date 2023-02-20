import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter first name"],
      trim: true,
    },
    last_name: {
      type: String,
      alias: "surname",
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Duplicate Email Not allowed"],
      trim: true,
      validate: function (value) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      trim: true,
    },
    salary: {
      type: Number,
      default: 0.0,
      validate(value) {
        if (value < 0.0) {
          throw new Error("Please enter a valid salary.");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model("Employee", EmployeeSchema);
