var mongo = require("mongoose"); 
 var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
var db =  mongo.connect("mongodb://127.0.0.1:27017/demo", options);  
module.exports =db;  
  
// demo is database name  
// 127.0.0.1:27017 is your mongo server name  