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
    try {
        const doctorId = req.params.id;
        const uid = req.uid;

        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.json({
                ok:true,
                msg:'does not exist doctor'
            });
        }
        const hospital = 

        doctorchanges = {
            ...req.body,
            user: uid
        }

        const updateDoctor = await Doctor.findByIdAndUpdate(doctorId, doctorchanges, { new: true });

        res.json({
            ok:true,
            msg:'update doctor complete',
            updateDoctor
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error update doctor hospital'
        })
    }
}

const deleteDoctor = async(req, res = response) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.json({
                ok:true,
                msg:'does not exist doctor'
            });
        }
        await Doctor.findOneAndDelete(doctorId);
        
        res.json({
            ok:true,
            msg:'delete doctor complete'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error delete doctor'
        })
    }
}

module.exports = {
    getDoctors, 
    createDoctor, 
    updateDoctor, 
    deleteDoctor
}