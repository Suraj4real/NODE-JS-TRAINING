const express =require("express")
const app = express()



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

app.listen(3000,function(){
    console.log("Server has started at port 3000")
})