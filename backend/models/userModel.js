const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,password:{
        type: String,
        required: true
    },
    blocked:{
        type: Boolean,
        required: true
    },
    cart: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
})

// static signup method
userSchema.statics.signup = async function(name,place,age,phone,email, password,blocked) {

    //validation
    if (!email || !password){
        throw Error('all fields must be entered')
    }
    if(!validator.isEmail(email)){
        throw Error('enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password must be strong')
    }

    const exists = await this.findOne({ email })


    if (exists) {
        throw Error("email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ name,place,age,phone,email, password: hash, blocked })

    return user

}


//static login method
userSchema.statics.login = async function(email, password){
    //validation
    if (!email || !password){
        throw Error('all fields must be entered')
    }

    const user = await this.findOne({ email })


    if (!user) {
        throw Error("user doesn't exists")
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('incorrect password')
    }

    return user
}


module.exports = mongoose.model('User',userSchema)