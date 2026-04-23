const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const bcrypt  = require('bcryptjs')

function generateToken (id , role , userName , email) {

  return jwt.sign({
    id ,
    role,
    userName , 
    email
  }, process.env.JWT_SECRET)
}
async function registerUser(req , res) {
  const {userName , email , password , role = 'user'} = req.body ;

  const isUserAlreadyExist = await userModel.findOne({
    $or : [{
      userName} , 
     { email}
    ]
  })
  if(isUserAlreadyExist) {
    return res.status(409).json({
      message : "USER ALREADY EXIST"
    })
  }

  const hash = await bcrypt.hash(password , 10)
  const User = await userModel.create( {
    userName ,
    email ,
    password : hash ,
    role ,
  })
  const token = generateToken(User._id , User.role)
  res.cookie("token" , token )
  res.status(201).json({
    message : "User Register Successfully",
    id : User._id ,
    userName : User.userName, 
    email : User.email ,
    password : User.password,
    role : User.role
  })
}

async function loginUser(req , res) {
  const {userName , email , password} = req.body ;
  const user = await userModel.findOne({
    $or : [
      {userName} ,
      {email}
    ]
  });
  if (!user) {
    return res.status(401).json({
      message : "Invalid Credential " ,
    })
  }
  const isValidePassword = await bcrypt.compare(password , user.password) ;
  if (!isValidePassword) {
    return res.status(401).json({
      message : "Invalid Password"
    }) ;
  };

  const token = generateToken(user._id , user.role) ;
   res.cookie("token" , token )

    res.status(201).json({
    message : "User login Successfully",
    id : user._id ,
    userName : user.userName, 
    email : user.email ,
    password : user.password,
    role : user.role
  })

}

async function logout(req , res) {
  res.clearCookie("token") ;
  return res.status(200).json({message : " LOgout sucessfully"}) 
}

module.exports = {registerUser , loginUser}