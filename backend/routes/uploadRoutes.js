const path = require('path'); //nodejs module to work with file paths
const express = require('express');
const multer = require('multer'); //multer is upload images form

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) { //cb=callback
        cb(null, 'uploads/') // /uploads is location
    },
    filename(req, file, cb) {
        cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`) //path gets filename without extension
    }
})

function checkFileType(file, cb) { // true or false
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype) // has to have jpg, jpeg, or png in the filetype

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!') //callback error msg
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

module.exports = router;