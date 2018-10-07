const express = require('express');
const blogCheerio = require('./blogCheerio').getBlogs;

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/getBlogs', function (req, res) {
  blogCheerio().then((result)=>{
    console.log(`Result Count::${result.length}`);
    res.send(result);
  }, err => {
    console.log(`Err::${err}`);
  })
});

let server = app.listen(8086, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`服务器已经开启，访问地址为http://${host}:${port}`);
});
