import multer from "multer"
import path from "path"

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder
        if(req.baseUrl.includes("user")){
            folder = "users"
        }else if(req.baseUrl.includes("pets")){
            folder = "pets"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + Math.floor(Math.random() * 1000) +path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Please, is need jpg or png!"))
        }
        cb(undefined, true)
    }
})

export {imageUpload}

