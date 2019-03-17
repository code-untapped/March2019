const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/qualify", (req, res, next) => {
  // const check = new check();
  const TimeNow = new Date();
  let article = `{
    "email" : "dave@gmail.com",
    "type" : "employee",
    "borrowAmount" : 2000,
    "salaryBand" : "15000 to 20000"
  }`;
  collection = "qualifyLeads";
  db().then(() => {
    db.Article.create(JSON.parse(article), collection).then((doc, err) => {
      const msg = "Record inserted into MongoDB collection: " + collection;
      console.log(msg);
      response = { success: "OK" };
      console.log(JSON.stringify(response));
      res.writeHead(200, { "Content-Type": "JSON" });
      res.end(JSON.stringify(response));
    });
  });
});

app.listen(app.get("port"), () => {
  console.log("Stuff is working!!! go to http://localhost:%s", app.get("port"));
});

module.exports = app;
