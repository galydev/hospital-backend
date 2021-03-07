const { response } = require("express");
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');


const getTodo = async(req, res = response) => {
    
    const search = req.params.search;
    const regex =  new RegExp(search, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name:regex }),
        Doctor.find({ name:regex }),
        Hospital.find({ name:regex })
    ]);
    
    res.json({
        ok:true,
        users,
        doctors,
        hospitals
    })
}

const getCollectionDocuments = async(req, res = response) => {
    
    const table = req.params.table;
    const search = req.params.search;
    const regex =  new RegExp(search, 'i');

    let data = [];

    switch(table) {
        case 'doctors':
            data = await Doctor.find({ name:regex })
                            .populate('user','name img')
                            .populate('hospital','name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name:regex })
                                 .populate('user','name img');            
            break;
        case 'users':
            data = await User.find({ name:regex });            
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'the table must be users or hospitals or doctors'
            });       
    }
    res.status(400).json({
        ok:false,
        data
    });
}

module.exports = {
    getTodo,
    getCollectionDocuments,
};