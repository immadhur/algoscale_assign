const express=require('express');
const userModel=require('./src/model/user');
const cors=require('cors');
const app=express();
const port=process.env.PORT||4000;
require('./src/db/mongoose');
app.use(express.json())

app.use(cors());

app.post('/signup', async (req, res)=>{
    try {
        console.log("Signup");
        const user=new userModel(req.body);
        await user.save();
        res.status(201).send({
            success:true,
            msg:'User created!'
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'error in creating user!'
        })
    }
})

app.post('/login', async (req, res)=>{
    try {
        console.log(req.body);
        const user=await userModel.find({username:req.body.username});
        console.log(user);
        if(user.length>0)
            res.status(200).send({
            success:true,
            msg:'User Logged in!'
        });
        else{
            res.send({
                success:false,
                msg:'User not found'
            });
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'error in loggin in user!',
            error
        })
        console.log(error);
    }
})

app.get('/users', async (req, res)=>{
    try {
        let users=await userModel.find();
        users=users.map(user=>{
            return {
                username:user.username
            }
        })
        console.log(users);
        res.status(200).send({
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            msg:'Unable to get users!'
        });
    }
})

app.post('/deleteuser', async (req, res)=>{
    try {
        console.log(req.body)
        const user =await userModel.findOneAndDelete({
            username:req.body.username
        });
        res.status(200).send({
            success:true,
            msg:'User deleted!'
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            msg:'Unable to delete user!'
        });
    }
})

app.listen(port, ()=>{
    console.log('Server is running on port '+port);
});

module.exports=app;