"use strict";
exports.__esModule = true;
var rp = require("request-promise");
var pg = require("pg");
var dF = require("dateformat");
var timers_1 = require("timers");
var CurInfo_1 = require("./models/CurInfo");
function main(format, conString, requestOptions) {
    var client = new pg.Client(conString);
    var inter = null;
    client.connect().then(function () {
        console.log("Connected to DB. Writing Data.");
        inter = timers_1.setInterval(function () {
            rp(requestOptions).then(function (response) {
                for (var sym in response.data) {
                    var curInf = new CurInfo_1.CurInfo(0, //Auto generated field in DB
                    response.data[sym].symbol, response.data[sym].quote.USD.price, new Date(response.data[sym].last_updated));
                    var date = dF(curInf.updatedTime.toISOString(), format); //Format to insert into DB
                    client.query("INSERT INTO public.\"Currencies\" (\"sym\", \"UsdValue\", \"UpdatedTime\" ) values ('" + curInf.symbol + "', " + curInf.usdValue + ",'" + date + "')").then(function () {
                        console.log("Data written!");
                    })["catch"]((function (error) {
                        console.log("Error writing to DB: " + error.message);
                        clearInterval(inter);
                        client.end();
                        throw error;
                    }));
                }
            })["catch"](function (error) {
                console.log('API call error:', error.message);
                clearInterval(inter);
                client.end();
                throw error;
            });
        }, 1000);
    })["catch"](function (error) {
        console.log("DB Connection Error: " + error.message);
        clearInterval(inter);
        client.end();
        throw error;
    });
    return inter;
}
exports.main = main;
