const mongoose = require("mongoose") ;

async function connectDb() {
  try{
  await mongoose.connect(process.env.MONGO_URI) ;
  console.log("connected to DB")
  }catch(err) {
    console.log("db not connected" , err) ;

  }
}

module.exports= connectDb