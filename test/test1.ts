import * as main from "../main";
import {expect} from 'chai';


describe('Currencies', function() {
    it('should fall on DB connection', function(done) {
        expect(main.main.bind(this,["","",""])).to.throw();
        
        done();
        });
      
    
        
    it('should fall on API call', function(done){
        const conString: string = "postgres://postgres:12345678@localhost:5432/MarkDB1";
        expect(main.main.bind(this,["",conString,""])).to.throw();
        done();
    });
    
    
    it('should fall on write to DB', function(done){
        const conString: string = "postgres://postgres:12345678@localhost:5432/MarkDB1";
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
        
        expect(main.main.bind(this,["",conString,requestOptions])).to.throw();
        done();
    });
    
    
    it('should write data', function(done){
        const conString: string = "postgres://postgres:12345678@localhost:5432/MarkDB1";
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
        const format : string ='yyyy-mm-dd hh:MM:ss';

        expect(main.main.bind(this,[format,conString,requestOptions])).to.not.throw();
        done();
    });
});