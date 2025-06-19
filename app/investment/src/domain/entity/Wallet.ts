import Transaction from "./Transaction";
import Asset from "./Asset";

export default class Wallet {
    private balance: number = 0;
    private name: string;
    private currency: string;
    constructor(
        readonly id: string,
        readonly userId: string,
        name: string,
        currency: string,
        readonly createdAt: Date,
    ) {
        this.name = name;
        this.currency = currency;
    }

    public static create(
        userId: string, name: string, currency: string
    ): Wallet {
        const id = crypto.randomUUID();
        const createdAt = new Date();
        return new Wallet(id, userId, name, currency, createdAt);
    }

    public calculateBalance(assets: Asset[]): void {
        this.balance = assets.reduce(
            (acc, asset) => acc + (asset.average * asset.quantity), 0);
    }

    public getBalance(): number {
        return this.balance;
    }

    public getName(): string {
        return this.name;
    }

    public getCurrency(): string {
        return this.currency;
    }
}