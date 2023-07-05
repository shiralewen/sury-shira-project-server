const mongoose=require("mongoose");
const Joi=require("joi");

const missionSchema=new mongoose.Schema({
    allUsers:Array,
    // eventId:String,
    name:String,
    description:String,
    ingredientList:Array,
    checkIngredientList:Array,
    nameIngredientList:Array,
    taskList:Array,
    checkTaskList:Array,
    nameTaskList:Array,
    user_id:String,
    marks:String,
    place:String,
    hour:String,
    date:Date
})

exports.MissionModel=mongoose.model("missions",missionSchema);

exports.validateMission=(_reqBody)=>{
    let joiSchema=Joi.object({
        // eventId:Joi.string().min(2).max(9999999).required(),
        name:Joi.string().min(2).max(9999999).required(),
        description:Joi.string().min(2).max(999999999999999).required(),
        ingredientList:Joi.array().required(),
        taskList:Joi.array().required(),
        checkIngredientList:Joi.array().allow(),
        nameIngredientList:Joi.array().allow(),
        nameTaskList:Joi.array().allow(),
        checkTaskList:Joi.array().allow(),
        allUsers:Joi.array().allow(""),
        // marks:Joi.string().min(2).max(9999999).required(),
        place:Joi.string().min(1).max(99999).allow(''),
         hour:Joi.string().allow(''),
         date:Joi.date().allow('')
    })
    return joiSchema.validate(_reqBody);

   
}
exports.validateTable=(_reqBody)=>{
    let joiSchema=Joi.object({
        checkIngredientList:Joi.array().allow(),
    nameIngredientList:Joi.array().allow(),
    nameTaskList:Joi.array().allow(),
    checkTaskList:Joi.array().allow()
    })
    return joiSchema.validate(_reqBody);
}


