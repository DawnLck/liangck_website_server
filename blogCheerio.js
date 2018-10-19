const http = require("http");
const https = require("https");

const cheerio = require("cheerio");

const wz = "https://segmentfault.com/blog/dawnlck";

module.exports.getBlogs = function () {
  let strHtml = "";
  let results = [];

  return new Promise((resolve, reject)=>{
    https.get(wz, function (res) {
      res.on("data", function (chunk) {
        strHtml += chunk;
      });
      res.on("end", function () {
        let $ = cheerio.load(strHtml);
        $(".stream-list.blog-stream section").each((item, i) => {
          results.push({
            title: $(i).find('h2').text() || 'Error',
            url: `https://segmentfault.com${$(i).find('h2 a').attr('href')}`,
            time: /[01]?\d月[0-3]?\d日/gi.exec($(i).find('.author').text())[0] || $(i).find('.author').text() || 'Error',
            abstract: $(i).find('p').text() || 'Error',
            zan: $(i).find('.stream__item-zan-number').text() || 'Error'
          })
        });
        console.log('Blog Count: ' + results.length);
        resolve(results);
      });
    });
  });
};

