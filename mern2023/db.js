const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mernstack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
})
    .then(() => {
        console.log("Mongoose connected");
    })
    .catch((err) => {
        console.log("Mongoose Not Connected", err);
    });