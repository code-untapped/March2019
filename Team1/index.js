const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require ('./db');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send('Hello world')
});

app.get('/results', (req, res, next) => {
  var Timenow = new Date();
  var results = {
    "type": req.query.type,
  }
    collection='productType';
    db().then(() => {
      db.Alexa.create(results, collection).then((doc, err) => {
        console.log(err)
      });
    });
});

app.listen(app.get('port'), () => {
  console.log('Code Untapped listening on: http://localhost:%s', app.get('port'));
});

module.exports = app;
