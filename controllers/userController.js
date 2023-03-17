const bcrypt = require('bcryptjs')
const Product = require('../models/Product.Schema');
const Donation = require('../models/Donation.Schema');
const User = require('../models/User.Schema')

exports.signUpUserController = async(req, res)=>{
  try{
    const {name, password, contact, adhar,location,role} = req.body;
    console.log(req.body)
    if(!name || !password || !contact) throw new Error("Please fill all fieilds", 400)

    // const existingUser = await User.find({email});
    // console.log(existingUser)

    // if(existingUser)
        // throw new Error("User already exists", 400)

    if(req.body.role == 'FARMER' && !adhar)
          throw new Error("Need Adhar no. for farmers", 400)
        

        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        password: encryptedPassword,
        contact,
        adhar,
        location,
        role

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
    const {contact, password} = req.body;

    if(!contact || !password)
        throw new Error("Please fill all fieilds", 400);

    const user = await User.findOne({contact})
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

exports.getUserController = async(req, res)=>{
    try{
        const user = await User.findById(req.user);
        if(!user) throw new Error("not such User Found");

        res.status(200).json({
            success: true,
            user,
            message: "user retrived successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getUserBuyedProducts = async(req, res)=>{
    try {
        const userId = req.user;
        const products = await Product.find({ buyers: userId });
        res.status(200).json({ products });
      }catch(err){

    }
}


exports.getProductList = async(req, res)=>{
    try{
        const userId = req.user;
        const products = await Product.find({user: userId});
        res.status(200).json({
            success: true,
            products
        })
    }catch(err){

    }
}

exports.getDonationList = async (req,res)=>{
    try{
        const user = req.user;
        const donationList = await Donation.find({
            $or:[{sender:user},{receiver:user}]
        });
        console.log(donationList);
        res.status(200).send({
            success:true,
            donationList
        });
    }catch(err){
        res.status(500).json(
            {
                success: false,
                message: err.message
            }
        )
    }
}

exports.getUserWhoBoughtProductds = async(req, res)=>{
    try{
        const { productID} =req.params;
        const product = await Product.findById(productID).populate("buyers")


        res.status(200).json({
            success: true,
            message: "done",
            orders: product.buyers
        })
    }catch(err){
        res.status(500).json(
            {
                success: false,
                message: err.message
            }
        )
    }
}

// exports.addMoneyController = async(req, res)