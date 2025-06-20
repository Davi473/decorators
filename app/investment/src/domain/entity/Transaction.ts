export default class Transaction {
    constructor(
        readonly id: string,
        readonly walletId: string,
        readonly type: 'BUY' | 'SELL',
        readonly name: string,
        readonly category: string,
        readonly currency: string,
        readonly average: number,
        readonly quantity: number,
        readonly createdAt: Date,
    ) {}

    public static create(
        walletId: string,
        type: 'BUY' | 'SELL',
        name: string,
        category: string,
        currency: string,
        average: number,
        quantity: number,
        createdAt: Date = new Date(),
    ) {
        return new Transaction(
            crypto.randomUUID(),
            walletId,
            type,
            name,
            category,
            currency,
            average,
            quantity,
            createdAt,
        );
    }   
}