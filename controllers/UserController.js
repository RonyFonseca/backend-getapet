import User from "../models/User.js"
import bcrypt from "bcryptjs"

//Helpers
import createUserToken from "../helpers/create-user-token.js"
import checkToken from "../helpers/check-token.js"
import getUserToken from "../helpers/get-user-by-token.js"

class UserController{
    static async register(req, res){
        const {name, phone, email, password, confirmPassword} = req.body 

        //VALIDATIONS
        if(!name){
            res.status(422).json({message:"The name field is empty!"})
            return 
        }
        if(!phone){
            res.status(422).json({message:"The phone field is empty!"})
            return 
        }
        if(!email){
            res.status(422).json({message:"The email field is empty!"})
            return 
        }
        if(!password){
            res.status(422).json({message:"The password field is empty!"})
            return 
        }
        if(!confirmPassword){
            res.status(422).json({message:"The confirm password field is empty!"})
            return 
        }
        if(password !== confirmPassword){
            res.status(422).json({message:"The field password is different from the confirmation of password field!"})
            return 
        }
        
        const UserExist = await User.findOne({email:email})
        if(UserExist !== null){
            res.status(422).json({message:"Este usuário ja existe"})
            return 
        }

        //Creating the password 
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Creating the user
        const user = new User({
            name: name, 
            email: email, 
            phone: phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        }catch(error){
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body 

        if(!email){
            res.status(422).json({message:"The email field is empty!"})
            return 
        }
        if(!password){
            res.status(422).json({message:"The password field is empty!"})
            return
        }

        // Exist user 
        const user = await User.findOne({email:email})
        if(!user){
            res.status(422).json({message:"This user not exist"})
            return
        }
        
        // Check password
        const confirmPasswordDb = await bcrypt.compare(password, user.password)
        if(!confirmPasswordDb){
            res.status(422).json({message:"Invalid password!"})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = checkToken(req, res)

            const user = await User.findById(token.id).select("-password")

            currentUser = user
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.estatus(422).json({message: "User not found !"})
            return 
        }

        res.status(200).json({user})
    }

    static async editUser(req, res){
        const {email, name, phone, image, password, confirmPassword} = req.body

        const user = await getUserToken(req)

        //VALIDATIONS

        if(req.file){
            user.image = req.file.path
        }
        if(!user){
            res.status(422).json({message:"User not exist !"})
            return 
        }

        const userExist = await User.findOne({email: email})

        if(!email){
            res.status(422).json({message:"The email field is empty!"})
            return 
        }

        if(userExist._id.toString() == user._id.toString()){
            if(user.email == email){
                user.email = email 
            }
        }else{
            res.status(422).json({message: "Use a different email"})
            return
        }

        if(!name){
            res.status(422).json({message:"The name field is empty!"})
            return 
        }

        user.name = name

        if(!phone){
            res.status(422).json({message:"The phone field is empty!"})
            return 
        }

        user.phone = phone

        if(!password){
            res.status(422).json({message:"The password field is empty!"})
            return 
        }
        if(!confirmPassword){
            res.status(422).json({message:"The confirm password field is empty!"})
            return 
        }
        if(password !== confirmPassword){
            res.status(422).json({message:"the password not confirm with field confirm password!"})
            return 
        }else if(password == confirmPassword){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            await User.findOneAndUpdate({_id: user._id}, {$set: user}, {new:true})
            res.status(200).json({message:"The user is updated"})
        }catch(err){
            res.status(500).json({message:err})
            return
        }

    }
}

export default UserController