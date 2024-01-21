import fs from 'fs'
import path from 'path'

export const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, `../uploads/${filename}`), (err) => {
    if (err) {
      console.log(err)
    }
  }) 
}