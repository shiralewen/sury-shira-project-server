const express= require("express");
const {authToken,authAdmin} = require("../auth/authToken");
const {EventModel,validateEvent} = require("../models/eventModel")
const router = express.Router();


router.get("/" , async(req,res)=> {
  // Math.min -> המספר המקסימלי יהיה 20 כדי שהאקר לא ינסה
  // להוציא יותר אם אין צורך בזה מבחינת הלקוח
  let perPage = Math.min(req.query.perPage,20) || 7;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  // מחליט אם הסורט מהקטן לגדול 1 או גדול לקטן 1- מינוס 
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try{
    let data = await EventModel
    .find({})
    .limit(perPage)
    .skip((page - 1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }

})


router.get("/getNameOfEvent" , async(req,res)=> {
  try{
    let data = await EventModel
    .find({},{name:1,description:1,icon:1})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }

})

router.get("/:id" , async(req,res)=> {
  try{
    let data = await EventModel
    .findOne({_id:req.params.id})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }

})



router.post("/", authAdmin, async(req,res) => {
  let valdiateBody = validateEvent(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let event = new EventModel(req.body);
    // event.user_id = req.tokenData._id;
    await event.save();
    res.status(201).json(event)
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})


router.put("/:idEdit",authAdmin, async(req,res) => {
  let valdiateBody = validateEvent(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let idEdit = req.params.idEdit
    let data = await EventModel.updateOne({_id:idEdit},req.body)
    // modfiedCount:1 - אם יש הצלחה
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

router.delete("/:idDel",authAdmin, async(req,res) => {
  try{
    let idDel = req.params.idDel
    // כדי שמשתמש יוכל למחוק רשומה הוא חייב 
    // שלרשומה יהיה את האיי די ביוזר איי די שלו
    let data = await EventModel.deleteOne({_id:idDel})
    // "deletedCount": 1 -  אם יש הצלחה של מחיקה
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

module.exports = router;