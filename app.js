const express =require("express")
                                          
const connection = require("./database/connection")
const User =require("./models/userModel.js")
const Blog =require("./models/userBlog.js")
const app = express()
connection()
 



app.get("/",function(req,res){//req=request and res=response
    res.json({
        name:"Home Page"
    })
})
app.get("/about",function(req,res){
    res.json({
        address :"About Web Address",
        age:18,
        name:"Suraj"
    })
})
app.get("/fetch-users",async function(req,res){
    const data = await User.find()
    res.json({
        data :data
    })
})
app.get("/fetch-blog",async function(req,res){
    const data = await Blog.find()
    res.json({
        data:data
    })

})

app.listen(3000,function(){
    console.log("Server has started at port 3000")
})