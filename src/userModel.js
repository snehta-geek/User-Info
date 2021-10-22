import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema=new mongoose.Schema({
    
    id:{type: Schema.Types.ObjectId},
    name :{type:String, required:true, trim: true,},
    email : { type: String,
        unique: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
        lowercase: true,},
    mobile :{type: String,
        validate: {
          validator: function (mobile) {
            return /^[0-9]*$/.test(mobile);
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },},
    password : { type: String},
    image :{type:String}
    
}
);

const Users=mongoose.model('Users',userSchema);
export default Users;