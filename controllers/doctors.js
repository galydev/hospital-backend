const { response }= require('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res = response) => {
    const doctors = await Doctor.find()
                                .populate('user','name img')
                                .populate('hospital','name');
    res.json({
        ok:true,
        doctors:doctors
    })
}

const createDoctor = async(req, res = response) => {
    
    try {
        const uid = req.uid;
        console.log(uid);
        const doctor = await Doctor({
            user: uid,
            ...req.body
        });

        const response = await doctor.save();

        res.json({
            ok:true,
           doctor:response
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:true,
            msg:'Error inesperado'
        })
    }
    
}

const updateDoctor = async(req, res = response) => {
    res.json({
        ok:true,
        msg:'inicio'
    })
}

const deleteDoctor = async(req, res = response) => {
    res.json({
        ok:true,
        msg:'inicio'
    })
}

module.exports = {
    getDoctors, 
    createDoctor, 
    updateDoctor, 
    deleteDoctor
}