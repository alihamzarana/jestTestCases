const { userInfo } = require('os');
const Card = require('../model/card');


const addCard = async (req, res) => {
    try {
        const newCard = await Card.create({...req.body, ordering: 0})
        await  Card.findByIdAndUpdate({_id: newCard._id}, {$push: {listId: newCard.listId} })
            return res.status(201).json({
            success: true,
            message: 'Card created successfully',
            card: newCard,
            });

        
    } catch (err) {
        console.log("error::", err.message)
            return res.status(400).json({
            success: false,
            message: err.message || 'something went wrong',
            });
        
    }
}

const allCard =  async (req, res) => {
    try {
        const cards = await Card.find({}).populate("listId")
         
         return res.status(201).json({
            success: true,
            message: 'Card created successfully',
            card: cards,
            });
        
    } catch (err) {
           console.log("error::", err.message)
            return res.status(400).json({
            success: false,
            message: err.message || 'something went wrong',
            });
    }
}

module.exports = {
 addCard,
 allCard
}