const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET , {expiresIn:'3d'});
}

const login = async (req,res) =>{
   const {email,password} = req.body;
   try{
        const user = await User.loginUser(email,password);
        const token = createToken(user._id);
        res.status(200).json({email,token});
   }catch(err){
        res.status(400).json({error:err.message});
   }
}

const signup = async (req,res) => {
    const {email,password} = req.body;
    try{

        const user = await User.signupUser(email,password);
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }catch(err){
        res.status(400).json({error:err.message});
    }

    
}

module.exports = {login,signup};