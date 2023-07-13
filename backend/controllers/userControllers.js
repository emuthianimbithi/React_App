const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//get all users

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

//get one user

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user_id" });
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  res.status(200).json(user);
};

//create a new user

const createUser = async (req, res) => {
  const { name, email, age, password } = req.body;
  const val = await User.findOne({ email: email });
  if (val) {
    return res.status(400).json({ error: "User already exists" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const user = {
          name: name,
          email: email,
          age: age,
          password: hash,
        };
        try {
          //add to database
          User.create(user);
        } catch (err) {
          return res.status(400).json({error: err.message});
        }
      });
    });
  }
};

//delete one user

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user_id" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  return res.status(200).json({ user: user });
};

//update one user

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user_id" });
  }

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
