export default class Transaction {
    constructor(
        readonly id: string,
        readonly walletId: string,
        readonly type: 'BUY' | 'SELL',
        readonly name: string,
        readonly category: string,
        readonly currency: string,
        readonly amount: number,
        readonly createdAt: Date,
    ) {}
}