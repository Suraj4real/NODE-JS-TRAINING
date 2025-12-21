require("dotenv").config()  
const express = require("express")
                                          
const connection = require("./database/connection")
const User = require("./models/userModel.js")
const Blog = require("./models/userBlog.js")
const app = express()
const bcrypt = require("bcrypt")
connection()

 

//req.body ko data show gardinxa postman ma nabhaye undefined dekhauxa
 app.use(express.json()) 
 



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
// app.post("/register",function (req,res){
//     console.log(req)
// })
app.post("/register",async function (req,res){
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    //const {name,email,password} =req.body    
    // Alt process called  Object DeStructuring
    console.log(name,email,password)
    await User.create({
        name : name,
        email : email,
        password :bcrypt.hashSync(password,12) //12 is a salting number

    }
    )
    res.json({
        message : "धन्यवाद registration ko laagi!!"
    })

    
})
// app.delete("/delete/:id",async function(req,res){
//     const id = req.params.id
//     await User.findByIdAndDelete(id)
//     res.json({
//         message:"Deleted successfully!!!"
//     })
// })
app.delete("/delete",async function(req,res){
    const id=req.body.id 
    await User.findByIdAndDelete(id)
    res.json({
        message: "Deleted successfully!!!"
    })
    
})
app.post("/blog",async function (req,res){
    const {title,subtitle,description} = req.body
    console.log(title,subtitle,description)
    await Blog.create({
        title:title,
        subtitle:subtitle,
        description:description
    })
    res.json({
        message:"Details haruko lagi धन्यवाद!!"
    })
})
app.patch("/update-user/:id", async function(req, res){
    const id = req.params.id
    const {name, email} = req.body
    
     await User.findByIdAndUpdate(id, {
        name: name,
        email: email
     })
    
    res.json({
        message: "User Updated Successfully!!"
    })
})
app.patch("/update-blog/:id",async function(req,res){
    const id = req.params.id
    const{title,subtitle,description}=req.body
    await Blog.findByIdAndUpdate(id,{
        title:title,
        subtitle:subtitle,
        description:description
    })
    res.json({
        message:"Blog updated successfully"
    })

})


app.delete("/delete-blog/:id",async function(req,res){
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
      message:"Deleted successfully!!!"
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
        const isMatched=bcrypt.compareSync(password,data.password)
        if(isMatched){
            res.json({
                message:"Logged in success"
            })

        }else{
            res.json({
                message:"Invalid password"
            })

        }
    }
})