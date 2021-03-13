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
    
    try {
        const hospitalId = req.params.id;
        const uid = req.uid;

        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return res.json({
                ok:true,
                msg:'does not exist hospital'
            });
        }

        hospitalchanges = {
            ...req.body,
            user: uid
        }

        const updateHospital = await Hospital.findByIdAndUpdate(hospitalId, hospitalchanges, { new:true });


        res.json({
            ok:true,
            msg:'update hospital complete',
            updateHospital
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error update hospital'
        })
    }
    
}

const deleteHospital = async(req, res) => {
    try {
        const hospitalId = req.params.id;
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return res.json({
                ok:true,
                msg:'does not exist hospital'
            });
        }
        await Hospital.findOneAndDelete(hospitalId);
        
        res.json({
            ok:true,
            msg:'delete hospital complete'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error delete hospital'
        })
    }
    
}

module.exports = {
    getHospitals, 
    createHospital, 
    updateHospital, 
    deleteHospital 
}