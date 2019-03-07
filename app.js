"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latestt',
    qs: {
        symbol: 'BTC,ETH,XRP',
        convert: 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': '253b527c-1179-414f-9622-9baba8f89cc0'
    },
    json: true,
    gzip: true
};
var conString = "postgres://postgres:12345678@localhost:5432/MarkDB1";
var format = 'yyyy-mm-dd hh:MM:ss';
main_1.main(format, conString, requestOptions);
