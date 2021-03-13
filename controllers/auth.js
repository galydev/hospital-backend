const { response } = require('express');
const bcrypt = require('bcryptjs');
// models
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGoogle = async(req, res = response) => {
    
    const googleToken = req.body.token;
    try {
        const {name, email, picture } = await googleVerify(googleToken);
        const userdb = await User.findOne({email});
        let user;
        if(!userdb){
            user = new User({
                name: name,
                email:email,
                img:picture,
                password:'@@@@',
                google:true
            });
        } else {
            user = userdb;
            user.google = true;
            user.password = '@@@@';
        }

        await user.save();

        //generate token
        const token = await generateJWT( user.id );

        res.json({
            ok:true,
            msg:'Google Sign in',
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error token'
        })
    }
}

const renewToken = async(req, res = response) => {
    
    const uid = req.uid;
    //generate token
    const token = await generateJWT( uid );
    res.json({
        ok:true,
        token
    });
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}