const mongoose=require("mongoose")
async function connection(){
    await mongoose.connect("mongodb+srv://NodeJS:bista11026@cluster0.nq5efxu.mongodb.net/?appName=Cluster0")
    console.log("DataBase Connected successfully!!")
}
//Export Command
module.exports=connection