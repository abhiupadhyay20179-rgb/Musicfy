import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" ;
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d' });
};



const loginUser = async (req,res)=>{
      const {email, password} = req.body;

      try {
    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success: false , message :"User doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
      

      if(!isMatch){
        return res.json({success: false , message: "Invalid credentials"});
      }

      const token = createToken(user._id);
      return res.json({
        success: true,
        token,
        userData: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
      
}
catch(error){
       console.log(error);
       return res.json({success:false, message:error.message});
      }
    };


    const registerUser = async (req, res) => {
      const {name, email, password} = req.body;

      try {
        const userExists = await userModel.findOne({email});

        if (userExists) {
          return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
          return res.json({ success: false, message: "Please enter a valid email" });
        }
           
        if (password.length < 8) {
          return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
          name,
          email,
          password : hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        return res.json({
          success: true,
          token,
          userData: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });

      } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
      }


    }


   const getUserProfile = async (req,res)=> {
     try {
      const userId = req.userId || req.body?.userId;
      const user = await userModel.findById(userId).select("-password");
      if(!user){
        return res.json({success:false, message:"User not found"});
      }
      return res.json({success:true , userData: user})
     } catch (error) {
      console.log(error);
      return res.json({success:false, message:error.message})
     }
   }

    export {loginUser, registerUser, getUserProfile};