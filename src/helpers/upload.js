const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'asset/img')
    },
    filename: (req, file, cb)=> {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })
   
const upload = multer({ storage: storage })

module.exports = upload