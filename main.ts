import * as rp from 'request-promise';
import * as pg from 'pg';
import * as dF from 'dateformat';
import { setInterval } from 'timers';

import {CurInfo} from './models/CurInfo';


export function main(format : string, conString : string, requestOptions) {
    const client = new pg.Client(conString);
    var inter = null;
    client.connect().then(() => {
        console.log("Connected to DB. Writing Data.")
        inter = setInterval(() => {
            rp(requestOptions).then(response => {

                for (var sym in response.data) {
                    let curInf: CurInfo = new CurInfo(
                        0,//Auto generated field in DB
                        response.data[sym].symbol,
                        response.data[sym].quote.USD.price,
                        new Date(response.data[sym].last_updated)
                    );

                    let date: string = dF(curInf.updatedTime.toISOString(), format);//Format to insert into DB

                    client.query(`INSERT INTO public."Currencies" ("sym", "UsdValue", "UpdatedTime" ) values ('${curInf.symbol}', ${curInf.usdValue},'${date}')`).then(() => {
                        console.log("Data written!");
                        
                    }).catch((error => {
                        console.log("Error writing to DB: " + error.message);
                        clearInterval(inter);
                        client.end();
                        throw error;
                    }));
                }

            }).catch((error) => {
                console.log('API call error:', error.message);
                clearInterval(inter);
                client.end();
                throw error;
            });
        }, 1000);

    }).catch(error => {
        console.log("DB Connection Error: " + error.message);
        clearInterval(inter);
        client.end();
        throw error;
    });
    return inter;
}