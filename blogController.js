const Blog = require("../models/userBlog")
async function createBlog(req,res){
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
}
async function updateBlog(req,res){
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

}
async function deleteBlog(req,res){
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
      message:"Deleted successfully!!!"
    })
}
async function fetchBlog(req,res){
    const data = await Blog.find()
    res.json({
        data:data
    })

}
module.exports={createBlog,updateBlog,deleteBlog,fetchBlog,}