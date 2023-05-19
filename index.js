const fs = require("fs");
const PostmanLocalMockServer = require("@jordanwalsh23/postman-local-mock-server");

//Create the collection object.
let collection = JSON.parse(
  fs.readFileSync("./Luxspace-Mock.postman_collection.json", "utf8")
);

//Create a new server
let server = new PostmanLocalMockServer(2323, collection);

//Start the server
server.start();
