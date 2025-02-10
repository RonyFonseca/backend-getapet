import jwt from "jsonwebtoken"


const createUserToken = async(user, req, res) => {

    // creating the token 
    const token = jwt.sign({
        name: user.name, 
        id: user._id
    }, process.env.JWT_SECRET)

    // return token 
    res.status(200).json({message: "Você está autenticado !", token, UserId: user._id, name: user.name})
}

export default createUserToken