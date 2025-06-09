import Entry from "./Entry";
import { DateValidation } from "../vo/DateValidation";

export default class EntryIncome extends Entry {
    @DateValidation()
    private date: string
    constructor(
        id: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ) {
        super(id, name, category, amount, currency);
        this.date = date;
    }

    public getDate(): string {
        return this.date;
    }
}