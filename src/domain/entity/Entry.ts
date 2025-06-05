import { Amount } from "../vo/Amount";
import { Category } from "../vo/Category";
import { DateValidation } from "../vo/Date";
import { Description } from "../vo/Description";

export default class Entry {
    @Amount()
    private amount: number;
    @Description()
    private description: string;
    @DateValidation()
    private date: number;
    @Category()
    private category: string;

    constructor(
        readonly id: string, readonly idUser: string,
        amount: number, description: string, 
        date: number, category: string
    ) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.category = category;
    }

    public static create( 
        idUser: string,
        amount: number, description: string, 
        date: number, category: string
    ): Entry {
        const id = crypto.randomUUID();
        return new Entry(id, idUser, amount, description, date, category);
    }

    public getAmount(): number {
        return this.amount;
    }
    public getDescription(): string {
        return this.description;
    }
    public getDate(): number {
        return this.date;
    }
    public getCategory(): string {
        return this.category;
    }
}
