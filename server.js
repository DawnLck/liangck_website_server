const express = require('express');
const path = require('path');
const blogCheerio = require('./blogCheerio').getBlogs;

const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(express.static('dist'));

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
  console.log(`服务器已经开启，访问地址为 http://${host}:${port}`);
  console.log(`服务器模式： ${process.env.NODE_ENV}`)
});
