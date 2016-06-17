var request = require("request");
var cheerio = require("cheerio");
var nightmare = require("nightmare");
var urlArg = process.argv.slice(2)[0];
renderPrice = function(resultObj){
    for(var i = 0; i < resultObj.length; i++){
        console.log(resultObj[i]);
    }
//    console.log(resultObj);
    process.exit();
}
var secretflying = new nightmare()
    .viewport(1000, 2000)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto("http://www.secretflying.com/euro-deals/")
    .wait(10000)
    .evaluate(function () {
        flightPosts = document.getElementsByClassName("blogpost_preview_fw");
        matchResults = [];
        for (var i = 0; i < flightPosts.length; ++i) {
            var flight = flightPosts[i];  
            if(flight.innerText.indexOf('UK') > -1 || flight.innerText.indexOf('London') > -1){
                var itemDescription = flight.getElementsByClassName("contentarea")[0];
                var itemDate = flight.getElementsByClassName("box_date")[0];
                console.log(itemDescription);
                var itemDescription = itemDescription.innerText;
                var itemDate = itemDate.innerText.replace(/(\r\n|\n|\r)/gm,"");
                console.log(itemDescription);
                matchResults.push(itemDate + " " +itemDescription);
            }
        }
        return matchResults;
    })
    .run(function (err, nightmare) {
      if (err) return console.log(err);
      renderPrice(nightmare);
    });



//
//flightPosts = document.getElementsByClassName("blogpost_preview_fw");
//        matchResults = [];
//        for (var i = 0; i < flightPosts.length; ++i) {
//            var flight = flightPosts[i];  
//            if(flight.innerText.indexOf('UK') > -1){
//                var itemDescription = flight.getElementsByClassName("contentarea")[0];
//                console.log(itemDecription);
//                var itemDescription = itemDescription.innerText;
//                console.log(itemDescription);
//                matchResults.push(itemDescription);
//            }
//        }