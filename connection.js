const mongoose = require("mongoose")

async function connection(){
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("DataBase Connected successfully!!")
}

module.exports = connection