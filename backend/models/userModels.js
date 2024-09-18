const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true
    }
})


userSchema.statics.signup = async function (email,password) {

    //validation
    if(!email || !password) {
        throw Error('Please provide email and password')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('Password should be strong')
    }


    const exists = await this.findOne({ email})

    if(exists){
        throw  Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user =  this.create({ email, password: hash })

    return user
}


userSchema.statics.login = async function (email,password) {
    if(!email || !password){
        throw Error('Please provide email and password')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Invalid email ')
    }

    const Match = await bcrypt.compare(password, user.password)

    if(!Match){
        throw Error('Invalid password')
    }

    return user
 
}


module.exports = mongoose.model('User', userSchema);