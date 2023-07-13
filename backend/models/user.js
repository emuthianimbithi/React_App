const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
    },
    email: {
      type: "string",
      require: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: "number",
      require: true,
    },
    password: {
        type: "string",
        require: true
    },
    image: {
      type: "string"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
