const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


//Creating a user model
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})

//hashing the user password
UserSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
        
        
    } catch (error) {
        next(error)
        
    }
})


UserSchema.methods.isValidPassword = async function(password){

    try {

      return await bcrypt.compare(password, this.password)
        
    } catch (error) {
        throw error
        
    }
}
//linking the user model as a collection in mongodb
const User = mongoose.model('user', UserSchema);

module.exports = User