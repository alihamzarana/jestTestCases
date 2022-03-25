const mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ordering: {
        type: Number,
        default: 0
    },
    listId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],

},{
    timestamps: true,
});

const Card = module.exports = mongoose.model('Card', cardSchema);
module.exports.get = function (callback, limit) {
    Card.find(callback).limit(limit); 
 }
