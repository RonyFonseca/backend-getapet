import mongoose from "mongoose"

async function main(){
    await mongoose.connect("mongodb+srv://ronyfonsecadev:3uB9BeDYEeKFF9vE@cluster0.kec6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Conectou ao mongoose !")
}

main().catch((err) => console.log(err))

export default mongoose
