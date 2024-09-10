const express = require("express")
const app = express()

const mongoose = require("mongoose");

async function connectDb() {
    const res = await mongoose.connect("mongodb://localhost:27017");
    if(res) {
        console.log("mongodb connected");
    }

}

connectDb();

const userSchema = new mongoose.Schema({
    username : String,
    password : String
})

const User = mongoose.model('User' , userSchema);

app.post("/signup" , async (req,res) => {
    const body = req.body;

    const newUser = new User({
        username : body.username,
        password : body.password
    })

    await newUser.save();

    res.status(200).json({
        msg : "signup success"
    })

})

app.listen(3000 , () => {
    console.log("app is listening at port " , 3000);
})