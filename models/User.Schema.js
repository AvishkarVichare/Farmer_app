const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
    },
    
    // email: {
    //     type: String,
    //     required: true
    // },

    password:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    adhar: {
        type: String,
        required: false,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'farmer'],
        default: 'farmer'
    },
    balance:{
        type: Number,
        default: 1000,
    }
});


// encrypt password
// userSchema.pre('save', async function (next) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = bcrypt.hash(this.password, salt);
//         next()

// })


userSchema.methods = {
    // compare password 
    // comparePasswords: async function (enteredPassword) {
    //     return await bcrypt.compare(enteredPassword, this.password)
    // },

    // get jwt token
    generateJwtToken: function () {
        const token = jwt.sign({
            id: this._id,
            role: this.role,
        },
            "shhh"//secret
           
        )

        return token;
    },
}

const User = mongoose.model('User', userSchema);

module.exports = User;