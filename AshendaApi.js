var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = 5000;
app.use(express.static("/node_modules"));
app.use(express.static('/public'));
// our collection name is geotodo_tbls
// our database name is Geotodo
var Product = require("./Model/product");
// import mongoose object for the purpose of casting given string to objectid
var ObjectId=require("./Model/db");
// allow access control for the Crud opreations from browser
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
// a method which allows access to the crud opreations
    app.use(allowCrossDomain);
// json parser for all RESTAPI usage
app.use(bodyParser.json());



 app.post("/Ashenda", function(req, res, next) {
  // Add your code here.
   var product = req.body;
   var id = product.id;// we are not using this attribute instead objectId
   var eventName= product.eventName;
   var imgID = product.imgID;
   var polygon = product.polygon;
   var status = product.status;
   var highScore = product.highScore;
   var creationTime = product.creationTime;// we are not use this attribute, because we are calculating remaining time on fly

 var product=new Product({
     "id":id,
  "eventName": eventName,
  "imgID":  imgID,
  "polygon": polygon,
  "status": status,
  "highScore": highScore,
  "creationTime": creationTime
 });

     product.save(function(err, product) {
        if(err) {
             res.status(500);
             next("Internal server error.");
         } else if(product == null) {
             res.status(404); // Not found
            next("No appointment with code " + idProduct + " found.");
         } else {
            res.status(201);
             res.json(product);
         }
      });


 });

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port);

});
