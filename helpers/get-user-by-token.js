import checkToken from "./check-token.js"
import User from "../models/User.js"

const getUserToken = async (req) => {
    const token = checkToken(req)
    const user = await User.findById(token.id)
    return user

}

export default getUserToken