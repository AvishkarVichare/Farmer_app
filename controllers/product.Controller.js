const Product = require('../models/Product.Schema')
const User = require('../models/User.Schema')

exports.getProductsController = async (req, res) => {
    try {
      const products = await Product.find().sort({ _id: -1 });
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  exports.createProductController = async (req, res) => {
  
    try {
      const { title, description, imageUrl, price } = req.body;
      // console.log(req.user)

      const user  = await User.findById(req.user);
      const product = new Product({
        title,
        ownerName: user.name,
        description,
        imageUrl,
        user: req.user,
        price
      });
      await product.save();
  
      res.status(201).json({
        success: true,
        product,
        message: 'post created successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  
  }

  exports.buyProductController = async(req, res)=>{
    try{
        const {productId} = req.params;
        const user = await User.findById(req.user);
        const product = await Product.findById(productId);
        
        product.buyers.push(user._id);

        const farmer = await User.findById(product.user);
        console.log(farmer)
        farmer.balance += product.price;

        await farmer.save();

        await product.save()
        res.status(200).json(
            {
                success: true,
                message: "bought",
                product
            }
        )

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
  }