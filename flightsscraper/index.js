var request = require("request");
var cheerio = require("cheerio");
    result = "";
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
          }
      });
      if (noFlights){
          console.log("No flights from " + desiredCode + " found on airfare watchdog");
      }
    });