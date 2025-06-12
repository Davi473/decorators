export default interface ConvertCurrencyService {
    getCurrency(): Promise<void>;
    getConvet(currencyUser: string, currencyEntry: string): number;
}

import axios from "axios";

export class ConvertCurrencyServiceCdn implements ConvertCurrencyService{
    private convertCurrency: any = {};

    public async getCurrency() {
        const values: any =  await axios.get("https://cdn.moeda.info/api/latest.json");
        if (values.status !== 200) throw new Error("Servidor fora o ar");
        this.convertCurrency = values.data.rates;
    }

    public getConvet(currencyUser: string, currencyEntry: string): number {
        const currencyUserInUsd = this.convertCurrency[currencyUser]
        const currencyEntryInUsd = this.convertCurrency[currencyEntry]
        return currencyUserInUsd / currencyEntryInUsd;
    }
}