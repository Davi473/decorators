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
        name: string,
        category: string,
        amount: number,
        currency: string,
        dayToPay: string,
        amountPaid?: number,
        paidDay?: string,
    ) {
        super(id, name, category, amount, currency);
        this.dayToPay = dayToPay;
        if (amountPaid) this.amountPaid = amountPaid;
        if (paidDay) this.paidDay = paidDay
    }

    public setPaidDay(value: string): void {
        this.paidDay = value;
    }

    public setAmountPaid(value: number): void {
        this.amountPaid = value;
    }
}