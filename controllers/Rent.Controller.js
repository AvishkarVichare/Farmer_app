const User = require('../models/User.Schema');
const Rent = require('../models/Rent.Schema');


exports.getRentPostsController = async (req, res) => {
    try {
      const rentPosts = await Rent.find().sort({ _id: -1 });
      res.status(200).json({
        success: true,
        rentPosts,
        message: "rent post retrived successfully"
      })
    } catch (err) {
        res.status(500).json({
        success: false,
        message: err.message
        })        
    }
  }
  

exports.createRentPostController = async (req, res) => {
    try {
      const { toolname, contact, image, description, rent, location} = req.body;
      const user =await  User.findById(req.user);
      const rentPost = new Rent({
        toolname,
        ownername: user.name,
        contact,
        image,
        description,
        rent,
        location
      });
      await rentPost.save();
      res.status(200).json({
        success: true,
        rentPost,
        message: "rent post created successfully"
      })
    } catch (err) {
        res.status(500).json({
        success: false,
        message: err.message
        })        
    }
  }

  exports.editRentController = async (req, res) => {
    try {
      const { rentId } = req.params;
      const { toolname, ownername, contact, image, description, rent } = req.body;
      const rentPost = await Rent.findByIdAndUpdate(rentId, {
        toolname,
        ownername,
        contact,
        image,
        description,
        rent
      }, { new: true });
      if (!rentPost) {
        return res.status(404).json({ message: 'Rent post not found' });
      }
      res.json(rentPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }