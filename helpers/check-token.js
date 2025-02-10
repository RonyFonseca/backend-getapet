import jwt from "jsonwebtoken"

const checkToken =(req, res) => {

    if(!req.headers.authorization){
        res.status(422).json({message:"Acesso negado"})
    }

    const headers = req.headers.authorization
    const token = headers.split(" ")[1]

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    return verified

}

export default checkToken