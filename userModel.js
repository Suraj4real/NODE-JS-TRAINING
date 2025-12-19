const mongoose = require("mongoose")
const schema = mongoose.Schema //schema =class
const userSchema = new schema({ //Class Instantiation where userSchema=object
    name: String,
    email: String,
    password: String
})  
const User=mongoose.model("User",userSchema)

module.exports = User
