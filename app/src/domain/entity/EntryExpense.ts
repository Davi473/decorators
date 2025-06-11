import { Amount } from "../vo/Amount";
import { DateValidation } from "../vo/DateValidation";
import Entry from "./Entry";

export default class EntryExpense extends Entry {
    @Amount()
    private amountPaid?: number;
    @DateValidation()
    private dayToPay: string;
    @DateValidation()
    private paidDay?: string
    constructor(
        id: string,
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        dayToPay: string,
        amountPaid?: number,
        paidDay?: string,
    ) {
        super(id, idUser, name, category, amount, currency);
        this.dayToPay = dayToPay;
        if (amountPaid) this.amountPaid = amountPaid;
        if (paidDay) this.paidDay = paidDay
    }

    static create(
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        dayToPay: string,
    ): EntryExpense {
        return new EntryExpense(
            crypto.randomUUID(),
            idUser,
            name,
            category,
            amount,
            currency,
            dayToPay
        );
    }

    public setPaidDay(value: string): void {
        this.paidDay = value;
    }

    public setAmountPaid(value: number): void {
        this.amountPaid = value;
    }

    public json(): object {
        const json = super.json();
        return {
            ...json,
            amountPaid: this.amountPaid,
            dayToPay: this.dayToPay,
            paidDay: this.paidDay
        };
    }
}