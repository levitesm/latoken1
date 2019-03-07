import {main} from "./main";

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
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

const conString: string = "postgres://postgres:12345678@localhost:5432/MarkDB1";
const format : string ='yyyy-mm-dd hh:MM:ss';

main(format, conString, requestOptions);

