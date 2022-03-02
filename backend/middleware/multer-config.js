const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'

};

const storage = multer.diskStorage({ //enregistré sur le disk
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        name = file.originalname.split('.')[0]
        name = name.split(' ').join('_') // Elimine le problème des espaces
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + '_' + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage }).single('image');    // single fichier unique et non pas un groupe de fichiers 