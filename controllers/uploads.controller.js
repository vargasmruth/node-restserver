
const { response, request } = require("express");
const { uploadFile } = require('../helpers')

const upFile = async(req = request, res = response) => {

    console.log(req.files);
  
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
      res.status(400).json({msg: 'No hay archivos que subir.'});
      return;
    }

    try {
        /* const fileName = await uploadFile(req.files, ['txt', 'yml'], 'textos'); */
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            fileName
        })    
    } catch (error) {
        res.status(400).json(error);
    }    
}

module.exports = {
    upFile
}