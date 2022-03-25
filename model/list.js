const mongoose = require('mongoose');
const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
 
    
},{
    timestamps: true,
});

const List = module.exports = mongoose.model('List', listSchema);
module.exports.get = function (callback, limit) {
    List.find(callback).limit(limit); 
 }
