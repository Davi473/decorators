import Entry from "./Entry";
import { DateValidation } from "../vo/DateValidation";

export default class EntryIncome extends Entry {
    @DateValidation()
    private date: string
    constructor(
        id: string,
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ) {
        super(id, idUser, name, category, amount, currency);
        this.date = date;
    }

    static create(
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ): EntryIncome {
        return new EntryIncome(
            crypto.randomUUID(),
            idUser,
            name,
            category,
            amount,
            currency,
            date
        );
    }

    public getDate(): string {
        return this.date;
    }

    public json(): object {
        const json = super.json();
        return {
            ...json,
            date: this.date
        };
    }
}