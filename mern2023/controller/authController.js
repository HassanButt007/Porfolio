const User = require("../models/user_model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
    try {
        res.status(200).send("hello Home")
    } catch {
        res.status(400).send("home error")
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json("User Already Exist!");
        }

        const userCreated = await User.create({ username, email, phone, password });
        const token = await userCreated.generateToken(); // Generating token here
        res.status(201).json({
            msg: "Register User",
            token: token, // Using the token variable here
            userId: userCreated._id.toString(), // Corrected accessing _id
        });

        console.log("token", token); // Logging token here

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).send("Register error");
    }
}


// =============================================== Login
const login = async(req, res) => {
    try {
        const{email, password} = req.body;
        const userExistForLogin = await User.findOne({ email: email });

        if (!userExistForLogin) {
            return res.status(400).json("User not Exist!");
        }

        // const isPasswordCorrect = bcrypt.compare(password, userExistForLogin.password);

        const isPasswordCorrect =  userExistForLogin.comparePassword(password);

        if (isPasswordCorrect) {
            const token = await userExistForLogin.generateToken();
            res.status(201).json({
                msg: "Login Success",
                token: token, 
                userId: userExistForLogin._id.toString(),
            });
        }

    } catch (error) {
        console.error("Error during registration:", error); 
    }
}


module.exports = { home, register, login };