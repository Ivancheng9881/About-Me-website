var load = 'more';

$("#load-more").on('click',function (e) {
    // show the next hidden div.group, then disable load more once all divs have been displayed
    
    
    // if we are loading more
    if (load == 'more') {
        
        // get the amount of hidden groups
        var groups = $('.group:not(:visible)');
        
        // if there are some available
        if (groups.length > 0) {
            // show the first
            groups.first().show();
            
            // if that was the last group then set to load less
            if (groups.length == 1) {
                switchLoadTo('less');
            }
        }
    // we are loading less
    } else {
        // get the groups which are currently visible
        var groups = $('.group:visible');
        
        // if there is more than 1 (as we dont want to hide the initial group)
        if (groups.length > 1) {
            
            // hide the last avaiable
            groups.last().hide();
            // if that was the only group available, set to load more
            if (groups.length == 2) {
                switchLoadTo('more');
            }
        }
    }
});

function switchLoadTo(dir) {
    load = dir;
    $("#load-more").html('Load ' + dir);
};


// coinranker api call 

var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "0E362A33-27F8-4D63-980F-07A93E96E2D9";

var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

fetch(`${proxyUrl}${baseUrl}?limit=8`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log(json.data);
        let coinsData = json.data.coins;

        if (coinsData.length > 0) {
          var cryptoCoin = "";
        }

        coinsData.forEach((coin) => {
          cryptoCoin += "<tr>";
          cryptoCoin += `<td> ${coin.rank}</td>`;
            
          cryptoCoin += `<td> ${coin.btcPrice} </td>`;
          
          cryptoCoin += `<td> ${coin.name}</td>`;
          cryptoCoin += `<td> $${Math.round(coin.price*100)/100}</td>`;
          cryptoCoin += `<td> ${coin.symbol}</td>`;"<tr>";
        });
        document.getElementById("data").innerHTML = cryptoCoin;
      });
    }
  })
  .catch((error) => {
    console.log(error);
});