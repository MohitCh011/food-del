import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://chmohit00:Mohit110@cluster0.zo54c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Food-del').then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.