const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    body:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Review=new mongoose.model("Review",reviewSchema)

module.exports=Review