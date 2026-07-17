
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const app=express()
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected Successfully!");
    
})
.catch((err)=>{
    console.log("Database connection error",err.message);
    
})

const userSchema = new mongoose.Schema({
    email:{
        type :String,
        required :true
    },
    password:{
        type :String,
        required :true
    }
},{
    timestamps : true
})

const tasksSchema = new mongoose.Schema({
    
    text :{
        type :String,
        required :true
    },
    priority:{
        type :String
    },
    category:{
        type :String
        
    },
    completed:{
        type :Boolean

    },
    edit:{
        type :Boolean

    }
},{
    timestamps : true
})
const User = mongoose.model("Users",userSchema)

const TasksList = mongoose.model("Tasks",tasksSchema)

app.post("/tasks", async (req, res) => {
    console.log(req.body);
    
    try {
        const connectTasks = new TasksList(req.body);
        await connectTasks.save();

       
        
        res.status(200)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
// app.put('/update',async(req,res)=>{
//     try {
//         const {updatedList,index}=req.body
//         await TasksList.findOneAndUpdate({id:index},updatedList)
//         const tasks = await TasksList.find()
//         res.status(200).json(tasks)
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })
// app.put("/edit", async (req, res) => {
//     try {
//         const { id, edit } = req.body;

//         await TasksList.findOneAndUpdate({id}, {edit:edit});

//         const tasks = await TasksList.find();

//         res.status(200).json(tasks);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// app.delete("/delete", async (req, res) => {
//     try {
//         const { id } = req.body;

//         await TasksList.findOneAndDelete({id});

//         const tasks = await TasksList.find();

//         res.status(200).json(tasks);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
app.post('/login',async (req,res)=>{
    const {email,password}=req.body
    console.log(req.body);
    const hashedPassword= new bcrypt.hash(password,10)
    try{
        
        const connectUser = await User.findOne({email:email})
        if(!connectUser){
            console.log("User not found!");

            res.status(400).json({status:400,message : "Invalid User email or password!"})
            console.log("User found!");

            res.status(200).json({status:200,message : "Valid user!"})
        }
        const isMatch = await bcrypt.compare(password, connectUser.password);
        if (isMatch) {
            return res.status(200).json({
                status: 200,
                message: "Valid user!"
            });}
        else{
            console.log("User not found!");

            res.status(400).json({status:400,message : "Invalid User email or password!"})
        }
        
    }catch(err){
        console.log("error occured",err.message);
        
    }
    

})
app.post('/signup',async (req,res)=>{
    const {email,password}=req.body
    const hashedPassword= await bcrypt.hash(password,10)

    try{
        const user=await User.findOne({email:email})
        if(user){
            res.json({message : "email existed!"})

        }
        else{
            const connectUser = new User({email:email,password:hashedPassword})
            await connectUser.save()
            console.log("data saved in database");
            res.status(200).json({status:200,message : "signed-up successfully!"})
        }
        
        
    }catch(err){
        console.log("error occured",err.message);
        res.status(400).json({status:400,message : "sign-up not successfully!"})
        
    }
    

})
app.get('/',(req,res)=>{
    console.log(req.body);
    
    res.send("This is the get route")
})

const PORT = process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}!`);
    
})