const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const { dirname } = require('path');
const { fstat } = require('fs');

const fileUpload = async(req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['hospitals', 'doctors', 'users'];
   
    //valid types
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'does not doctor, hospital o users'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:true,
            msg:'does not file'
        });
    }

    //valid file
    const file = req.files.image;
    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1 ];
    const validExtension = ['png', 'jpg', 'jpeg','gif'];
    if(!validExtension.includes(extension)){
        return res.status(400).json({
            ok:false,
            msg:'does not valid extension file'
        });
    }

    //generate file
    const fileName = `${ uuidv4() }.${extension}`;
    //path
    const path = `./uploads/${type}/${fileName}`;

    // move image in path
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'error move image'
            });

        }
    });

    //update collections database
    updateImage(type, id, fileName);

    res.json({
        ok:true,
        msg:'file upload',
        fileName
    })
}

const getImage = (req, res= response) => {
    const type = req.params.type;
    const image = req.params.image;
    const pathImage = path.join( __dirname, `../uploads/${type}/${image}`);

    //default image
    if(fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        res.sendFile(path.join( __dirname, `../uploads/no-image.jpg`));
    }
}

module.exports = {
    fileUpload,
    getImage
};