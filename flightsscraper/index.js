var request = require("request");
var cheerio = require("cheerio");
var nightmare = require("nightmare");
//var express = require('express');
//END REQUIRES


//var app = express();  
var port = process.env.PORT || 8080;

//var router = express.Router();              // get an instance of the express Router
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

//app.get('/', function(req, res) {
    result = "";
    //Scrape and process airfare watchdog
    request("http://www.airfarewatchdog.com/top-50-fares/", function (error, response, body) {
      if (error) {
        console.log("Scraping airfare watchdog failed due to error: " + error);
        return;
      }
      var $ = cheerio.load(body), flights = $(".even, .odd");
      noFlights = true;
      desiredCode = "LAX";
      flights.each(function (i, flight) {
          depCity = $(this).find(".departurecity").text().trim();
          arrivalCity = $(this).find(".arrivalcity").text().trim();
          price = $(this).find(".price a").text().trim().split(" ")[0];
          depCode = depCity.replace( /(^.*\(|\).*$)/g, ''); 
          arrCode = arrivalCity.replace( /(^.*\(|\).*$)/g, '');
          if(depCode == desiredCode){
              noFlights = false;
              console.log("Watchdog: " + depCode + " " + arrivalCity + " " + price);
              result = result + "<p> Watchdog result from " + depCity + " to " + arrivalCity + " for " + price + "</p>"
          }
          else{
//              console.log("not from LAX");
          }
      });
      if (noFlights){
          console.log("No flights from " + desiredCode + " found on airfare watchdog");
      }
    });

    //Scrape and process google flights
//    renderPrice = function(resultObj){
//        console.log(resultObj.flightNo + " current price: " + resultObj.price);
//        result += "<p>" + resultObj.flightNo + " current price: " + resultObj.price + "</p>";
////        res.send(result);
//        process.exit();
//    }
//    var GoogleFlightJan = new nightmare()
//        .viewport(1000, 2000)
//        .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
//        .goto("https://www.google.co.uk/flights/#search;f=LHR,LGW,LCY,STN,LTN,QQS;t=LAX;d=2016-12-11;r=2017-01-10;sel=LHRLAX0AA135,LAXLHR0AA136")
//        .wait(10000)
//        .evaluate(function () {
//            console.log("flights");
//            price = document.querySelector(".FVLSEDC-y-u div div div div").innerText;
//            flightNo = document.querySelector(".FVLSEDC-y-u div:nth-child(3)").innerText;
//            return {"price":price, "flightNo":flightNo};
//        })
//        .run(function (err, nightmare) {
//          if (err) return console.log(err);
//          renderPrice(nightmare);
//        });
//});

//console.log(port);
//app.listen(port);