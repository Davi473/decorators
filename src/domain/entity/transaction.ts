function Amount() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: number) {
                if (value < 15) throw new Error("Erro")
                this[privateKey] = value;
            }
        });
    }
}


export default class Transaction {
    @Amount()
    private amount: number;
    private to: string;
    private from: string;

    constructor(amount: number, to: string, from: string) {
        this.amount = amount;
        this.to = to;
        this.from = from;
    }

    public json(): void {
        console.log(this.amount, this.to, this.from);
    }
}
