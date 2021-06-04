
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'gif'], directory = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut[nameCut.length - 1];

        /* Validate extension */
        if (!validExtensions.includes(extension)) {
            return reject(`.${extension}, no es una extensión válda, se espera [${validExtensions}]`);
        }

        const nameTemp = uuidv4() + '.' + extension;    
        const uploadPath = path.join(__dirname, '../uploads/', directory, nameTemp);

        file.mv(uploadPath, (err) => {
        if ( err ) {
            reject( err );
        }
    
        resolve(nameTemp);
        
        });
    })
    
    
}

module.exports = {
    uploadFile
}