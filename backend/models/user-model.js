const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})


userSchema.statics.signupUser = async function(email,password){

    const exists = await this.findOne({email});

    if(!email || !password){
        throw Error("All fields are necessary");
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough !!");
    }

    if(exists){
        throw Error("Email is already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const newUser = await this.create({email,password:hash});

    return newUser;

}

userSchema.statics.loginUser = async function(email,password){
    if(!email || !password){
        throw Error("All fields are necessary ");
    }

    const user = await this.findOne({email});
    if(!user){
        throw Error("Bro , Incorrect Email ");
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw Error("Password dont match !!");
    }

    return user;
}


module.exports = mongoose.model("User",userSchema);