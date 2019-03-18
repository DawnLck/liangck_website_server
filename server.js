const express = require("express");
const path = require("path");
const blogCheerio = require("./blogCheerio").getBlogs;
const history = require("connect-history-api-fallback");

const app = express();

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
app.use(allowCrossDomain);

app.use(history());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.use(express.static("dist"));

app.get("/getBlogs", function(req, res) {
  blogCheerio().then(
    result => {
      console.log(`Result Count::${result.length}`);
      res.send(result);
    },
    err => {
      console.log(`Err::${err}`);
    }
  );
});

let port = 80;
if (process.env.NODE_ENV === "development") {
  port = 8086;
}

let server = app.listen(port, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`服务器已经开启，访问地址为 http://${host}:${port}`);
  console.log(`服务器模式： ${process.env.NODE_ENV}`);
});
