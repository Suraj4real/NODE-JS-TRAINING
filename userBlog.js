const mongoose = require("mongoose")
const Schema = mongoose.Schema  
const userBlog = new Schema({
    title:String,
    subtitle:String,
    description:String
})
const Blog=mongoose.model("Blog",userBlog)

module.exports = Blog