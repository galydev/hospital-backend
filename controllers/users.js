const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

// models
const User = require('../models/user');

const getUsers = async(req, res) => {

    const from = Number(req.query.from) || 0;
    
    const [users, total] = await Promise.all([
        User.find({}, 'nombre email role google')
            .skip(from)
            .limit(5),
            User.countDocuments()
    ]);

    res.json({
        ok:true,
        users,
        uid: req.uid,
        total:total
    })
}

const createUser =  async(req, res = response) => {

    const { password, email} = req.body;
    try {
        const existEmail = await User.findOne({ email });
        if(existEmail) {
            return res.status(400).json({
                ok:false,
                msg:'email is already registry'
            });
        }

        const user = new User(req.body);

        //encript
        const salt =  bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        
        const token = await generateJWT(user.uid);

        res.json({
            ok:true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'error inesperado revisar log'
        });
        
    }    
}

const updateUser = async(req, res) => {
    const uid = req.params.id;
    
    try {
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({
                ok:false,
                msg:'There is no user with that id'
            })
        }

        const { password, google, email, ...fields } = req.body;

        if(user.email !== email) {
            const existEmail = await User.findOne( {email: email } );
            if(existEmail) {
                return res.status(400).json({
                    ok:false,
                    msg:'user already exists with that email'
                })
            }
        }

        fields.email = email;
        const updateUser = await User.findByIdAndUpdate(uid, fields, { new:true });

        res.json({
            ok:true,
            user:updateUser
        })
    } catch (error) {
        res.json({
            ok:true,
            msg:'error inesperado' + error
        }) 
    }
}

const deleteUser = async(req, res) => {
    const uid = req.params.id;
    
    try {
        const user = await User.findById(uid);
        if(!user) {
            return res.status(404).json({
                ok:false,
                msg:'There is no user with that id'
            })
        }
        await User.findByIdAndRemove(uid);

        res.json({
            ok:true,
            msg:'user delete'
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:true,
            msg:'error inesperado'
        }) 
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};