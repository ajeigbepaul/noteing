import {Schema, model, models} from 'mongoose'
import bcrypt from 'bcrypt'
const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!'],
    },
    username:{
        type: String,
        required:[true, 'Username already exist']
    },
    image:{
        type: String,
    },
    password:{
        type: String,
    }
})
UserSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

const User =  models.User || model("User", UserSchema)

export default User