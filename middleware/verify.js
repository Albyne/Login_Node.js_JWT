const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{
 const token = req.header('auth-token')
 if(!token){
     return res.status(401).json({error:true, message:"Acceso denegado"})
 }
 try {
     const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET)
     req.user = verifiedToken
     next()
 } catch (error) {
    res.status(400).json({error:true, message:"Invalid token"})
 }

}

module.exports = verifyToken