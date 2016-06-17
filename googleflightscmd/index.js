var request = require("request");
var cheerio = require("cheerio");
var nightmare = require("nightmare");
var urlArg = process.argv.slice(2)[0];
renderPrice = function(resultObj){
    console.log(resultObj.flightRoute + " from " + resultObj.outDate + " to " + resultObj.inDate + ". Current price: " + resultObj.price);
    process.exit();
}
var GoogleFlightJan = new nightmare()
    .viewport(1000, 2000)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto(urlArg)
    .wait(10000)
    .evaluate(function () {
        console.log("flights");
        price = document.querySelector(".FVLSEDC-y-u div div div div").innerText.trim();
        outDate = document.querySelector(".FVLSEDC-Tb-d div div div div").innerText.trim();
        inDate = document.querySelector(".FVLSEDC-Tb-d:nth-child(2) div div div").innerText.trim();
        flightRoute = document.querySelector(".FVLSEDC-Tb-d div div div:nth-of-type(2n) div:nth-of-type(2n)").innerText;
        flightNo = document.querySelector(".FVLSEDC-y-u div:nth-child(3)").innerText;
        return {"price":price, "flightNo":flightNo, "outDate":outDate,"inDate":inDate,"flightRoute":flightRoute};
    })
    .run(function (err, nightmare) {
      if (err) return console.log(err);
      renderPrice(nightmare);
    });