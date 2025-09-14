import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
    email:{
    type: String,
    require: true,
    unique : true,
  },
     email:{
    type: String,
    require: true,
  },
  password: { 
    type: String,
     required: true 
    },
  cartItems: { type: Object, default: {}},
  
}, 
{ minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;