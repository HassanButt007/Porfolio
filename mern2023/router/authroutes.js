const express = require("express");
const { home, register } = require("../controller/authController");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from router");
})

router.route("/register").post(register)

module.exports = router;