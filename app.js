require("dotenv").config()  
const express = require("express")
const bcrypt = require("bcrypt")
                                          
const connection = require("./database/connection")
const User = require("./models/userModel.js")
const Blog = require("./models/userBlog.js")
const {homePage,about,fetchUsers,register,deleteUser,updateUser} = require("./controllers/userController.js")
const{createBlog, deleteBlog,fetchBlog,updateBlog}=require("./controllers/blogController.js")
const app = express()
const jwt =require("jsonwebtoken")
connection()

 

//req.body ko data show gardinxa postman ma nabhaye undefined dekhauxa
 app.use(express.json()) 
 



app.get("/",homePage)
app.get("/about",about)
app.get("/fetch-users",fetchUsers)
// app.post("/register",function (req,res){
//     console.log(req)
// })
app.post("/register",register)
// app.delete("/delete/:id",async function(req,res){
//     const id = req.params.id
//     await User.findByIdAndDelete(id)
//     res.json({
//         message:"Deleted successfully!!!"
//     })
// })
app.delete("/delete",deleteUser)
app.post("/blog",createBlog)
app.patch("/update-user/:id", updateUser)
app.patch("/update-blog/:id",updateBlog)


app.delete("/delete-blog/:id",deleteBlog)

app.get("/fetch-blog",fetchBlog)

app.listen(3000,function(){
    console.log("Server has started at port 3000")
})
//login
app.post("/login",async function(req,res){
    const email = req.body.email
    const password =req.body.password

    const data = await User.findOne({email: email})
    if(!data){
        res.json({
            message:"Not registered!!"
        })

    }else{
        console.log(data.password)
        const isMatched=bcrypt.compareSync(password,data.password)
        if(isMatched){
                const token = jwt.sign({id:data._id}, process.env.SECRET_KEY, {
                
            })
            res.json({
                message:"Logged in success",
                token :token
            })

        }else{
            res.json({
                message:"Invalid password"
            })

        }
    }
})