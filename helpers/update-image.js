const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = (path) => {    
    if(fs.existsSync(path)) {
        // delete old image
        fs.unlinkSync(v);
    }
}

const updateImage = async(type, id, fileName) => {
    let oldPath = '';
    switch(type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor) {
                console.log('does not exist doctor');
                return false;
            }
            oldPath = `./updloads/doctors/${doctor.img}`;
            deleteImage(oldPath);

            doctor.img = fileName;
            await doctor.save();
            return true;
            break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital) {
                console.log('does not exist hospital');
                return false;
            }
            oldPath = `./updloads/hospitals/${hospital.img}`;
            deleteImage(oldPath);
            
            hospital.img = fileName;
            await hospital.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if(!user) {
                console.log('does not exist user');
                return false;
            }
            oldPath = `./updloads/users/${user.img}`;
            deleteImage(oldPath);
            
            user.img = fileName;
            await user.save();
            return true;
            break;
    }
 }

 module.exports = {
    updateImage,
 };