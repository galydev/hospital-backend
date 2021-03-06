const { response } = require('express');
const bcrypt = require('bcryptjs');
// models
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
     try {

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                ok:false,
                msg:'email does not exist'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password does not valid'
            })
        }
        //generate token
        const token = await generateJWT( user.id );
        
        return res.json({
             ok:true,
             token:token
         })
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok:false,
             msg:'talk to the administrator'
         })
     }
}

module.exports = {
    login,
}