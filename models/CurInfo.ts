export class CurInfo {
    id: number;
    symbol: string;
    usdValue: number;
    updatedTime: Date

    constructor(_id: number, _sym: string, _usdValue: number, _updatedTime: Date) {

        this.id = _id;
        this.symbol = _sym;
        this.usdValue = _usdValue;
        this.updatedTime = _updatedTime;
    }
}
