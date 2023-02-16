const mongoose= require('mongoose')
const { Schema } = mongoose;


//making schema for mongodb
const NotesSchema = new Schema({
    //associating notes with uique user id 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        

    },
    title:{
        type:String,required:true
    },
    description:{type:String,required: true},
    tag:{type:String,default:"General"},

    date:{
        type: Date,
        default: Date.now

    }


})

module.exports = mongoose.model('notes',NotesSchema)