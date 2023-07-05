const mongoose=require("mongoose");
const Joi=require("joi");

const eventSchema=new mongoose.Schema({
    name:String,
    description:String,
    ingredientList:Array,
    taskList:Array,
    image:{
        type:String,default:"default.png"
    }
    
})

exports.EventModel=mongoose.model("events",eventSchema);

exports.validateEvent=(_reqBody)=>{
    let joiSchema=Joi.object({
        name:Joi.string().min(2).max(9999999).required(),
        description:Joi.string().min(2).max(9999999).required(),
        ingredientList:Joi.array().required(),
        taskList:Joi.array().required()
        
    })

    return joiSchema.validate(_reqBody);
}
