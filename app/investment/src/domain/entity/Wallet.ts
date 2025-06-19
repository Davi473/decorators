import Transaction from "./Transaction";

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

    public calculateBalance(transactions: Transaction[]): void {
        this.balance = transactions.reduce(
            (acc, transaction) => acc + transaction.amount, 0);
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