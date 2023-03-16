const User = require('../models/User.Schema');
const bcrypt = require('bcryptjs')

exports.signUpUserController = async(req, res)=>{
  try{
    const {name, email, password, contact, adhar} = req.body;

    if(!name || !email || !password || !contact)
        throw new Error("Please fill all fieilds", 400)

    // const existingUser = await User.find({email});
    // console.log(existingUser)

    // if(existingUser)
        // throw new Error("User already exists", 400)

    if(req.body.role == 'farmer' && !adhar)
          throw new Error("Need Adhar no. for farmers", 400)
        

        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: encryptedPassword,
        contact,
        adhar

    })

    const token = user.generateJwtToken();

    user.password = undefined;

    // res.cookie("token", token, CookieOptions);

    res.status(200).json({
        success: true,
        token,
        message: "created user",
        user
    })
  }catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
  }
}



exports.loginController = async(req, res)=>{
   try{
    const {email, password} = req.body;

    if(!email || !password)
        throw new Error("Please fill all fieilds", 400);

    const user = await User.findOne({email})
    console.log(user)
    if(!user)
        throw new Error("Invalid credentials", 400)

    const isPasswordMatched = await bcrypt.compare( password, user.password)

    if(isPasswordMatched){
        const token = user.generateJwtToken();
        user.password = undefined;
        // res.cookie("token", token, CookieOptions);
        res.status(200).json({
            success: true,
            token,
            message: "logged in user",
            user
        })
    }
    else{
        throw new Error("Invalid credentials", 400)
    }
   }catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
  }
}