var express = require('express');
var app = express();
const axios = require('axios');
var FormData = require('form-data');
var validator = require('validator');

app.get('/', function (req, res) {
  if (
    !req.query ||
    !req.query.uprn ||
    !validator.isInt(req.query.uprn, { min: 0 })
  ) {
    return res.sendFile('/app/index.html')
  }
  var bodyFormData = new FormData();
  bodyFormData.append('ufprt', process.env.DATA_UFPRT);

  if (req.query.reminderMinutes && validator.isInt(req.query.reminderMinutes, { min: 0 })) {
    bodyFormData.append('ddlReminder', req.query.reminderMinutes);
  }

  axios({
    method: "post",
    url: 'https://www.southampton.gov.uk/whereilive/waste-calendar?UPRN=' + req.query.uprn,
    data: bodyFormData,
    headers: bodyFormData.getHeaders()
  })
  .then(function (response) {
    return res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
    return res.sendStatus(500)
  });
})

var server = app.listen(8080, '0.0.0.0', function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})