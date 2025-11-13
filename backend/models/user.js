import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is Required"],
        minLength: [3, "Name Must Be 3 Characters long"],
      },
      email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Passowrd is Required"],
        minLength: [6, "Password Must Be 6 Charactor Long"],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default User;
