const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kdata',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("done"))
.catch((err) => console.log(err));

// create mongoose.Schema
const kdataSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  course : String,
  chapter: Number,
  author : String,
  active : Boolean
})

// creating mongoose modal
const Kdata = new mongoose.model("Kdata",kdataSchema);

// //create and insert document in the datatbase

const java = new Kdata({
  name : "Java",
  course : "Java core",
  chapter: 10,
  author : "oracle",
  active : true
})
const c = new Kdata({
  name : "C",
  course : "C in details",
  chapter: 16,
  author : "hdsbfvhjrbg",
  active : true
})
const python = new Kdata({
  name : "python",
  course : "python master",
  chapter:29,
  author : "andor",
  active : true
})
const dream = new Kdata({
  name : "dream",
  course : "dream in details",
  chapter: 90,
  author : "andxor",
  active : true
})
const drawing = new Kdata({
  name : "drawing",
  course : "C in details",
  chapter: 10,
  author : "oracle",
  active : true
})
//save data to database
Kdata.insertMany([java,c,python,dream,drawing]);

// mongodb aggregation 
const getdocument = async () => {
  const result = await Kdata.aggregate([
    { $match : { name : "dream"}},
    { $group : {
      _id : "name",
      avgchapters : {$avg : "$chapter"}
      }
    },
    { $project : {_id:0}}
  ])
  console.log(result)
}
getdocument();