import { Amount } from "../vo/Amount";
import { Category } from "../vo/Category";
import { Currency } from "../vo/Currency";
import { Name } from "../vo/Name";

export default class Entry {
    private description: string;
    private category: string;
    private amount: number;
    private currency: string;
    private date: string;
    constructor(
        readonly id: string,
        readonly idUser: string,
        description: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ) {
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.currency = currency;
        this.date = date;
    }
    public getDescription(): string {
        return this.description;
    }
    public getCategory(): string {
        return this.category;
    }
    public getAmount(): number {
        return this.amount;
    }
    public getCurrency(): string {
        return this.currency;
    }
    public getDate(): string {
        return this.date;
    }
    public json(): object {
        return {
            id: this.id,
            idUser: this.idUser,
            description: this.description,
            category: this.category,
            amount: this.amount,
            currency: this.currency,
            date: this.date
        };
    }
}