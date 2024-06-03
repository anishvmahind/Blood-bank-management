const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async(req, res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        //validation
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'user already exists'
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPass;
        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message:'User registered successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in register Api",
            error
        })
    }
};

//login callback
const loginController = async(req, res) =>{
    try {
        const existuser = await userModel.findOne({email:req.body.email});
        if(!existuser){
            return res.status(404).send({
                success:false,
                message:'Invalid credentials'
            })
        }
        //check role
        if(existuser.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:"role does not match"
            })
        }
        const comparePass = await bcrypt.compare(req.body.password, existuser.password)
        if(!comparePass){
            return res.status(500).send({
                success:false,
                message:'Invalid credentials'
            })
        }
        const token = jwt.sign({userId:existuser._id}, process.env.JWT_SECRET, {expiresIn:'10d'})
        return res.status(200).send({
            success:true,
            message:'user login successfully',
            token,
            existuser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login api',
            error
        });
    }
};

//get current user
const currentUsercontroller = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "unable to get current user",
        error,
      });
    }
  };

module.exports = {registerController, loginController, currentUsercontroller};