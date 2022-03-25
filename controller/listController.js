const List = require('../model/list');


const addList = async (req, res) => {
    try {
        const newList = await List.create({...req.body})
         return res.status(201).json({
            success: true,
            message: 'Card created successfully',
            list: newList,
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
 addList,
}