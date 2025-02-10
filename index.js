import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

// SOLVE CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://frontend-getapet-mort.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//CONFIG JSON RESPONSE
app.use(express.json())

//PUBLIC FOLDER FOR IMAGES
app.use(express.static("public"))

//ROUTES
import UserRoutes from "./routes/UserRoutes.js"
app.use("/users", UserRoutes)

import PetRoutes from "./routes/PetRoutes.js"
app.use("/pets", PetRoutes)


app.listen(process.env.PORT)
