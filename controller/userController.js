const User = require('../model/user');
const handleSignUp = async (req, res) => {
 try {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
   return res.status(400).json({
    success: false,
    message: 'User already exists',
   });
  }

  const newUser = await User.create({
   email: req.body.email,
   name: req.body.name,
   password: req.body.password,
  });
    return res.status(201).json({
   success: true,
   message: 'User created successfully',
   user: newUser,
  });
 } catch (err) {
     console.log("error::", err.message)
  return res.status(400).json({
   success: false,
   message: err.message || 'something went wrong',
  });
 }
}

const getAllUser =  async (req, res) => {
  try {
    const allUser = await User.find({})
    console.log('allUser',allUser)
        if (!allUser.length) {
        return res.status(404).json({
        success: false,
        message: 'User not found',
        });
  }else{
        return res.status(201).json({
        success: true,
        message: 'User found successfully',
        user: allUser,
        })

  }
       
    
  } catch (err) {
        console.log("error::", err.message)
        return res.status(400).json({
        success: false,
        message: err.message || 'something went wrong',
        });
 }
    
  }
const getUser =  async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id})
    console.log('allUser',user)
        if (!user) {
        return res.status(404).json({
        success: false,
        message: 'User not found',
        });
  }else{
        return res.status(201).json({
        success: true,
        message: 'User found successfully',
        user: user,
        })

  }
       
    
  } catch (err) {
        console.log("error::", err.message)
        return res.status(404).json({
        success: false,
        message: err.message || 'something went wrong',
        });
 }
    
  }
const removeUser =  async (req, res) => {
  try {
      const user = await User.findByIdAndDelete({_id: req.params.id})
      console.log('allUser',user)
        if (!user) {
        return res.status(404).json({
        success: false,
        message: 'User not found',
        });
  }else{
        return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        })

  }
       
    
  } catch (err) {
        console.log("error::", err.message)
        return res.status(404).json({
        success: false,
        message: err.message || 'something went wrong',
        });
  }
}

const updateUser = async (req, res) => {
      try {
//             function checkPassword(pass) {
//   if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(pass)) {
//      throw new Error('E0001');
//   }

//   // Password is acceptable

// }

      const checkEmail = (email) => {
      if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
            throw new Error('Email is  invalid');

      }
      checkEmail(req.body.email)

          if(req.body.password.length < 8) {
            res.status(400);
            throw new Error('Password must be at least 8 characters long');
        } 
         const user = await User.findByIdAndUpdate({_id: req.params.id},  { ...req.body }, {new: true})
         if(user){
            return res.status(201).json({
            success: true,
            message: 'User updated successfully',
            user: user,
         })
            
      }else{
            return res.status(404).json({
            success: false,
            message: 'User not found',
      })

      }
} catch (err) {
        console.log("error::", err.message)
        return res.status(400).json({
        success: false,
        message: err.message || 'something went wrong',
        });
  }
} 


module.exports = {
 handleSignUp,
 getAllUser,
 getUser,
 removeUser,
 updateUser
}