require('dotenv').config()
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            error: "Unauthorized: Missing or invalid token"
        });
    }

    const token = authHeader.split(' ') [1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log("Auth Decoded: ", decoded)
        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({
                error: "Unauthorized: Invalid token format"
            });
        }
    }catch(err){
        return res.status(403).json({});
    }

}

module.exports = authMiddleware;
