//Establishes environment and assigns a port to use
const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

//Sets up an express app and sends message when set up
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

//Returns a message to let it be know that a connection to server was made
app.get("/", (req, res) => {
  res.send({ message: "Connected to Backend server!" });
});

//Uses the addItem function once a post request is made
app.post("/add/item", addItem);

//Takes a request from the front-end, converts request to json, and adds it to the database.json file
function addItem(request, response) {
  let id = request.body.jsonObject.id;
  let task = request.body.jsonObject.task;
  let curDate = request.body.jsonObject.currentDate;
  let dueDate = request.body.jsonObject.dueDate;
  var newTask = {
    ID: id,
    Task: task,
    Current_date: curDate,
    Due_date: dueDate,
  };
  const jsonString = JSON.stringify(newTask);

  var data = fs.readFileSync("database.json");
  var json = JSON.parse(data);
  json.push(newTask);
  fs.writeFile("database.json", JSON.stringify(json), function (err, result) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("Successfully wrote to file");
    }
  });
  response.send(200);
}
