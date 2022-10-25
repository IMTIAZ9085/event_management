const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       token = req.headers.authorization.split(" ")[1];
      }

      if(!token){
            return res.status(401).json({success: false, message:"Unauthorized Access"});
      }

      try{
       const decoded = jwt.verify(token,process.env.SECRET_KEY);
       const user = await User.findById(decoded.id);
       if(!user){
            return res.status(404).json({success: false, message:"No User find with this id"});
       }
       req.user=user;
      // res.status(401).json({success: true,user:user});
      // console.log(req.user);
       next(); 

      }catch(e){
            return res.status(401).json({success: false, message:e});
      }
}