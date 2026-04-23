const jwt  = require ('jsonwebtoken') ;

async function authArtist ( req , res ,   next) {
const token = req.cookies.token ;
if (!token) {
  return res.status(401).json({message : 'invalid credentials'})
}

try {
  const decode = jwt.verify(token , process.env.JWT_SECRET) ;
  if (decode.role !== "artist" ) {
    return res.status(401).json({
      message : "You dont have access" ,
    })
  }
  req.user = decode;
  next() ;

}
catch(err) {
  console.log (err) ;

}
}

async function authUser(req, res , next ) {
  const token = req.cookies.token ;
  if (!token) {
    return res.status(401).json({message : "unathorised ho"})
  }

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
    if (decoded.role !== 'user' && decoded.role !== 'artist') {
      return res.status(401).json({message : "you dont have access"})
    }
    req.user = decoded ;
    next() ;

  }catch (err) {
    console.log(err)
    return res.status(401).json({
      message:  "unathorised po" ,
    })
  }
  
}

module.exports = {authArtist , authUser} ;