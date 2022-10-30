const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()



// get user profile
const getProfile = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id).select('-password').select('-verificationCode')
        res.json(user)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// update user phone
const updatePhone = async (req, res) => {
    try {
        const { id } = req.user
        const { phone } = req.body
        if (!phone) {
            return res.json({
                msg: 'Por favor, ingrese número telefónico'
            })
        }

        const user = await User.findById(id)
        user.phone = phone;
        await user.save();
        res.status(201).json({
            msg: 'Telefono actualizado'
        })
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// change password
const changePass = async (req,res) => {
    const {email} = req.body;
    try {
        const emlUser = await User.findOne({ email });
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }
        const secret = process.env.jwtSecret + emlUser.password;
        const token = jwt.sing({email:emlUser.email, id:emlUser._id}, secret,{expiresIn: "5m",});
        const link = `http://localhost:5000/reset-password/${emlUser._id}/${token}`;
        console.log(link);

    } catch (error) {}
}

const resetPass = async (req,res) => {
    const {id,token} = req.params;
    console.log (req.params);
    const emlUser = await User.findOne({ _id: id });
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }

    res.send("done");
}




module.exports = { getProfile, updatePhone, changePass, resetPass }