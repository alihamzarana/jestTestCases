const User = require('../model/user');
const User1 =  require('../db/User')
const excelJS = require("exceljs");
const exportUser = async (req, res) => {
   const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "./files";  // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 }, 
    { header: "First Name", key: "fname", width: 10 },
    { header: "Last Name", key: "lname", width: 10 },
    { header: "Email Id", key: "email", width: 10 },
    { header: "Gender", key: "gender", width: 10 },
];
// Looping through User data
let counter = 1;
User1.forEach((user) => {
  user.s_no = counter;
  worksheet.addRow(user); // Add data in worksheet
  counter++;
});
// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
});
try {
  const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
   .then(() => {
     res.send({
       status: "success",
       message: "file successfully downloaded",
       path: `${path}/users.xlsx`,
      });
   });
} catch (err) {
    res.send({
    status: "error",
    message: err.message,
  });
  }
};
const handleSignUp = async (req, res) => {
try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
      return res.status(400).json({
      success: false,
      message: 'User already exists',
      });
      }
      if(req.body.password.length < 8) {
      res.status(400);
      throw new Error('Password must be at least 8 characters long');
      } 
      const checkPassword = (pass) => {
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(pass)) {
      throw new Error('Password will contain one uppercase alphabet, lowercase , numeric and a special character');
      }
      //  Password is acceptable

      }
      checkPassword(req.body.password)

      const checkEmail = (email) => {
      if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
      throw new Error('Email is invalid');
      }
      checkEmail(req.body.email)

      const newUser = await User.create({ ...req.body});
      return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
      });
      } 
      catch (err) {
      return res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      });
      }
}

const getAllUser =  async (req, res) => {
try {
    let queryObj = {
      ...req.query
    }

    if(queryObj.minAge || queryObj.maxAge){
      queryObj = {age: { $gt: +queryObj.minAge || 17, $lt: +queryObj.maxAge || 96 }, likes: { $in: [queryObj] }}
      delete queryObj.minAge;
      delete queryObj.maxAge;
      delete queryObj.likes;
    }
    
    const allUser = await User.find({ ...queryObj}).select({});
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
      })}
       }
      catch (err) {
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
      })}

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
      }) }
       
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
      
      if(req.body.password.length < 8) {
      res.status(400);
      throw new Error('Password must be at least 8 characters long');
      } 
      const checkPassword = (pass) => {
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(pass)) {
      throw new Error('Password will contain one uppercase alphabet, lowercase , numeric and a special character');
      }
      //  Password is acceptable

      }
      checkPassword(req.body.password)

      const checkEmail = (email) => {
      if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
      throw new Error('Email is invalid');
      }
      checkEmail(req.body.email)

      // let findPassword = await User.findOne({_id: req.params.id })

      // findPassword = findPassword.toObject();
      // console.log("findPassword", findPassword)
      // if(findPassword.password == req.body.password){
      //       throw new Error('Enter correct password');
      // }

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
 updateUser,
 exportUser
}