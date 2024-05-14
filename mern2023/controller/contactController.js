const Contact = require("../models/contact_model");

const contactForm = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const contact = await Contact.create({ name, email, phone, message });

        res.status(201).json({
            msg: "Form Submitted",
            contact: contact, // Use lowercase contact instead of Contact
        });

    } catch (error) {
        console.error("Error during contact form submission:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { contactForm };