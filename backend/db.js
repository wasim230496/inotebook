const mongoose = require('mongoose')


//url of database and connnection and databse name here inotebook
const mongoDb = "mongodb://127.0.0.1:27017/inotebook";
mongoose.set('strictQuery', true);
const connectToMongo = ()=>{
    mongoose.connect(mongoDb,()=>{
        console.log('connected to Mongo Successfully');
    })
}
module.exports= connectToMongo