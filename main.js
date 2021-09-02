//npm i request
let request = require("request");

//npm i cheerio
let cheerio = require("cheerio");

let coinCount = 0;
let coinArray = [];

//url
let url = "https://www.livecoinwatch.com";
console.log("Before");

request(url, cb);

function cb(err, response, html) {
  if (err) {
    //error
    console.log("Error" + err);
  } else if (response.statusCode == 404) {
    //response
    console.log("Page not found");
  } else {
    //Data Extraction
    dataExtractor(html);
    if ((coinCount = 50)) {
      console.table(coinArray);
    }
  }
}

function dataExtractor(html) {
  //search tool
  let $ = cheerio.load(html);
  //fetching the table array
  let tableArr = $("tbody tr");
  for (let i = 0; i < tableArr.length; i++) {
    //coin finder
    let coin = $(tableArr[i]).find("td");
    //coin name
    let coinName = $(coin[1]).find(".abr").text();
    //coin price
    let price = $(coin[2]).text();
    //market cap
    let marketCap = $(coin[3]).text();
    //all time high
    let alt = $(coin[6]).text();
    console.log(
      "----------------------------------------------------------------------------"
    );
    console.log(
      `Coin Name: ${coinName} \n Price: ${price} \n MarketCap: ${marketCap} \n AllTime High: ${alt}`
    );
    coinCount++;
    coinArray.push({
      CoinName: coinName,
      Price: price,
      marketCap: marketCap,
      AllTimeHigh: alt,
    });
  }
}
console.log("After");
