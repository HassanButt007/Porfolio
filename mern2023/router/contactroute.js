const express = require("express");
const {contact} = require("../controller/contactController");
const router = express.Router();

router.route("/contact").post(contactForm);

module.exports = router;