const User = require("../models/userModel")
const bcrypt = require("bcrypt")
function homePage(req,res){//req=request and res=response
    res.json({
        name:"Home Page"
    })
}
function about(req,res){
    res.json({
        address :"About Web Address",
        age:18,
        name:"Suraj"
    })
}
async function fetchUsers(req,res){
    const data = await User.find()
    res.json({
        data : data
    })
}
async function register(req,res){
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
}
async function deleteUser(req,res){
    const id=req.body.id 
    await User.findByIdAndDelete(id)
    res.json({
        message: "Deleted successfully!!!"
    })
    
}
async function updateUser(req, res){
    const id = req.params.id
    const {name, email} = req.body
    
     await User.findByIdAndUpdate(id, {
        name: name,
        email: email
     })
    
    res.json({
        message: "User Updated Successfully!!"
    })
}
module.exports ={homePage,about,fetchUsers,register,deleteUser,updateUser}