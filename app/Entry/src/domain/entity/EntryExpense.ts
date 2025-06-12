import { DateValidation } from "../vo/DateValidation";
import Entry from "./Entry";

export default class EntryExpense extends Entry {
    private paid: boolean
    constructor(
        id: string,
        idUser: string,
        description: string,
        category: string,
        amount: number,
        currency: string,
        date: string,
        paid: boolean,
    ) {
        super(id, idUser, description, category, amount, currency, date);
        this.paid = paid;
    }

    static create(
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        date: string,
        paid: boolean,
    ): EntryExpense {
        return new EntryExpense(
            crypto.randomUUID(),
            idUser,
            name,
            category,
            amount,
            currency,
            date,
            paid
        );
    }

    public json(): object {
        const json = super.json();
        return {
            ...json,
            paid: this.paid
        };
    }
}