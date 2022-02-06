var express = require('express');
var app = express();
const axios = require('axios');
var FormData = require('form-data');

console.log(process.env);

app.get('/', function (req, res) {
  if (!req.query || !req.query.uprn) {
    return res.sendFile('/app/index.html')
  }

  var bodyFormData = new FormData();
  bodyFormData.append('ufprt', process.env.DATA_UFPRT);
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