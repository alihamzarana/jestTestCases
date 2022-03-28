const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: '6'
    },
    
},{
    timestamps: true,
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("user about to be created", this);
  next();
});

const User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit); 
 }
