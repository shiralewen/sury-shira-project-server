// const { log } = require('console');

const mongoose = require('mongoose');
const {config}=require("../config/secret")

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/black23');
  await mongoose.connect('mongodb+srv://ShiraBoko:Sboko2000@cluster0.asv6c95.mongodb.net/project');

  console.log("mongo connect project");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}