// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api', (req, res, next) => {
  let unixDate = Date.now();
  let utcDate = new Date(unixDate);
  utcDate = utcDate.toUTCString();
  res.send({ unix: unixDate, utc: utcDate })
  next()
})

app.get('/api/:date', (req, res, next) => {
  const parsedParam = req.params.date

  const parsedDate = new Date(parsedParam)
  const unixParse = Date.parse(parsedParam)

  const numRegex = /^[\d]+$/;
  
  let unixDate;
  let utcDate;

  if (numRegex.test(parsedParam)) {
    unixDate = parseInt(parsedParam)
    utcDate = new Date(unixDate)
    utcDate = utcDate.toUTCString()
    res.send({ unix: unixDate, utc: utcDate })
  } else if (!unixParse) {
    res.send({ error : "Invalid Date" })
  } else {
    unixDate = parsedDate
    unixDate = Date.parse(unixDate)
    utcDate = new Date(parsedParam).toUTCString()
    res.send({ unix: unixDate, utc: utcDate })
  }

  next()

})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
