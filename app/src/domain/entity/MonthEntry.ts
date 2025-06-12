import ConvertCurrencyService from "../../infra/service/ConvertCurrencyService";
import Entry from "./Entry";

export default class MonthEntry {
    private month: { [key: string]: Month } = {};

    constructor (private entrys: Entry[]) {}

    public async calculate(convertCurrency: ConvertCurrencyService, currencyUser: string): Promise<void> {
        this.entrys.forEach(entry => {
            const date = new Date(entry.getDate());
            const month = String(date.getMonth() + 1).padStart(2, '0');;
            const year = String(date.getFullYear());
            if (!this.month[`${month}/${year}`]) {
                this.month[`${month}/${year}`] = {
                    month: month,
                    year: year,
                    valueExpenses: 0,
                    valueIncome: 0,
                };
            }
            const convert = convertCurrency.getConvet(currencyUser, entry.getCurrency());
            if (entry.getCategory() === 'expense') {
                this.month[`${month}/${year}`].valueExpenses += (entry.getAmount() * convert);
            } else if (entry.getCategory() === 'income') {
                this.month[`${month}/${year}`].valueIncome += (entry.getAmount() * convert);
            }
        })
    }
    public getMonth(): {} {
        return this.month;
    }
}

type Month = {
    month: string;
    year: string;
    valueExpenses: number;
    valueIncome: number;
}