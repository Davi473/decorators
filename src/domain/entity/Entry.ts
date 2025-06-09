import { Amount } from "../vo/Amount";
import { Category } from "../vo/Category";
import { Currency } from "../vo/Currency";
import { Name } from "../vo/Name";

export default class Entry {
    @Name(1)
    private name: string;
    @Category()
    private category: string;
    @Amount()
    private amount: number;
    @Currency()
    private currency: string;
    constructor(
        readonly id: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
    ) {
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.currency = currency;
    }
    public getName(): string {
        return this.name;
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
}