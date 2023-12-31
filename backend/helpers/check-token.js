const jwt  = require("jsonwebtoken");


//middleware to validate token

const checkToken = (req,res, next)=>{
    const token = req.header("auth-token");

    if(!token){
        return res.status(401).json({error:"acesso negado"})
    }
    try {
        const verified = jwt.verify(token,"254080");
        req.user = verified;
        next() // continue 
        
    } catch (error) {
        res.status(400).json({error:"token inválido"})
        
    }

}

module.exports  = checkToken