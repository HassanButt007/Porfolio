const express = require("express");
const app = express();
const router = require("./router/authroutes");
const { register, login } = require("./controller/authController");
const { contactForm } = require("./controller/contactController"); // Import the specific function
require("./db");

app.use(express.json());

app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.status(200).send("Hello Server");
})

app.post("/register", register);
app.post("/login", login);

app.post("/contact", contactForm); // Use the contactForm function here

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
