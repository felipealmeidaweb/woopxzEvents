const jwt = require("jsonwebtoken")

const user = require("../models/user")
const User = require("../models/user")


//get user by jwt token


const getUserByToken = async(token)=>{
    if(!token){
        return res.status(401).json({error:"acesso negado"})
    }

    // find user 

    const decoded = jwt.verify(token, "254080")
    const userId = decoded.id
    const user = await User.findOne({_id:userId})

    return user
}

module.exports = getUserByToken