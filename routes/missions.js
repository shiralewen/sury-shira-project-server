const express = require("express");
const { authToken } = require("../auth/authToken");
const { MissionModel, validateMission, validateTable } = require("../models/missionModel");
const router = express.Router();

router.get("/", authToken, async (req, res) => {
  let perPage = Math.min(req.query.perPage, 20) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let data = await MissionModel.find({ _id: req.tokenData._id })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.post("/", authToken, async (req, res) => {
  let valdiateBody = validateMission(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details);
  }
  try {
    let mission = new MissionModel(req.body);
    mission.user_id = req.tokenData._id;
    //איך שולחים את הid
    // mission.eventId=req.body._id;
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});


router.get("/:id" ,authToken, async(req,res)=> {
  try{
    let data = await MissionModel.findOne({_id:req.params.id})
    res.json(data);
  } 
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }

})

router.put("/:idEdit", authToken, async (req, res) => {
  let valdiateBody = validateMission(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data = await MissionModel.updateOne(
      { _id: idEdit, user_id: req.tokenData._id },
      req.body
    );
    // modfiedCount:1 - אם יש הצלחה
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});


router.put("/changeCheck/:idEdit", async (req, res) => {
  let valdiateBody = validateTable(req.body);
  if (valdiateBody.error) {
    return res.status(400).json(valdiateBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data = await MissionModel.updateOne({ _id: idEdit },req.body);
    // modfiedCount:1 - אם יש הצלחה
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.patch("/:id", async (req, res) => {
  // let valdiateBody = validateMission(req.body);
  // if (valdiateBody.error) {
  //   return res.status(400).json(valdiateBody.error.details);
  // }
  try {
    let idEdit = req.params.id;
    let data = await MissionModel.updateOne({ _id: idEdit }, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.post("/userMissions", async (req, res) => {
  try {
    const missions = await MissionModel.find({});
    const userMissions = [];

    for (let i = 0; i < missions.length; i++) {
      const mission = missions[i];

      for (let j = 0; j < mission.allUsers.length; j++) {
        if (req.body.email == mission.allUsers[j]) {
          userMissions.push(mission);
        }
      }
    }
    res.json(userMissions);
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});



module.exports = router;
