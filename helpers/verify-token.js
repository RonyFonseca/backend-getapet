import checkToken from "./check-token.js"

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(422).json({message:"Acesso negado!"})
        return
    }

    const token = checkToken(req)

    if(!token){
        res.status(422).json({message:"Acesso negado!"})
        return
    }

    try{
        req.user = token
        next()
    }catch(err){
        res.status(422).json({message: "Token inválido!", err})
        return
    }
}

export default verifyToken