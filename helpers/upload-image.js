import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudnary.js"; // Importação da configuração

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Pasta onde os arquivos serão armazenados no Cloudinary
    format: async (req, file) => "png", // Define o formato do arquivo (pode ser jpg, png, etc.)
    public_id: (req, file) => file.originalname.split(".")[0], // Usa o nome original do arquivo sem a extensão
  },
});

const upload = multer({ storage });

export default upload;