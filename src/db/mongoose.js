const mongoose=require('mongoose');
const url='mongodb://127.0.0.1:27017/algoscale';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log('Database connected!');
}).catch((err)=>{
    console.log('Error in connecting db!');
});

module.exports=mongoose;