
const usersR=require("./users");
const eventsR=require("./events");
const missionsR=require("./missions");


exports.routesInit=(app)=>{
    app.use("/users",usersR);
    app.use("/events",eventsR);
    app.use("/missions",missionsR);
}


