const express = require("express");
 
const recordRoutes = express.Router();
 
const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;
 
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("userDB");
 db_connect
   .collection("userCollection")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// get record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("userCollection")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// create a new record
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   phone: req.body.phone,
   imageurl: req.body.imageurl,
 };
 db_connect.collection("userCollection").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// update by id. I think this is where the bug is.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone, 
    imageurl: req.body.imageurl,   
   }, 
  }
});
 
// delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("userCollection").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;