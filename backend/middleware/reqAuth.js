const jwt = require('jsonwebtoken');
const User = require('../models/user-model')


const reqAuth = async (req,res,next) =>{

    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).json({error:'Authentication token is required'});
    }

    const token = authorization.split(' ')[1];
    

    try{
        const {_id} = jwt.verify(token,process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({error:'Request is not authorized'});
    }

}


module.exports = reqAuth;