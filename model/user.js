const mongoose = require('mongoose');
const userWalletSchema = mongoose.Schema({

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

const User = module.exports = mongoose.model('User', userWalletSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit); 
 }
