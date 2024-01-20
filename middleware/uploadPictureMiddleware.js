import multer from "multer";
import path from "path"

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"../uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, `${Data.now()}-${file.originalname}`)
  }
})

export const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000 // 1MB
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('File type is not supported'), false)
    }
    cd(null, true)
  }
})