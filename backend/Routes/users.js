const express = require("express");
const {createUser, getUsers, getUser, deleteUser, updateUser} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/create",createUser);

router.delete("/:id/delete", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
