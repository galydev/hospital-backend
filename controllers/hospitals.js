const { response }= require('express');

const Hospital = require('../models/hospital');

const getHospitals = async(req, res) => {
    const hospitals = await Hospital.find()
                                    .populate('user','name img');
    res.json({
        ok:true,
        hospitals:hospitals
    })
}

const createHospital = async(req, res) => {
    
    try {
        const uid = req.uid;
        const hospital = await Hospital({
            user: uid,
            ...req.body
        });

        const response = await hospital.save();

        return res.json({
            ok:true,
            hospital: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
    
}

const updateHospital = async(req, res) => {
    res.json({
        ok:true,
        msg:'inicio'
    })
}

const deleteHospital = async(req, res) => {
    res.json({
        ok:true,
        msg:'inicio'
    })
}

module.exports = {
    getHospitals, 
    createHospital, 
    updateHospital, 
    deleteHospital 
}