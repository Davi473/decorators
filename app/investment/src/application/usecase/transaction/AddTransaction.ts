import TransactionRepository from "../../repository/TransactionRepository";
import Transaction from "../../../domain/entity/Transaction";
import UseCase from "../UseCase";

export default class AddWallet implements UseCase {

    constructor(
        private readonly transactionRepository: TransactionRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { walletId, type, name, category, currency, average, quantity, createdAt } = input;
        const transaction = Transaction.create(
            walletId, type, name, category, currency, average, quantity, createdAt
        );
        await this.transactionRepository.save(transaction);
        return { 
            id: transaction.id,
            walletId: transaction.walletId,
            type: transaction.type,
            name: transaction.name,
            category: transaction.category,
            currency: transaction.currency,
            average: transaction.average,
            quantity: transaction.quantity,
            createdAt: transaction.createdAt
        }
    }
}

type Input = {
    walletId: string;
    type: 'BUY' | 'SELL';
    name: string;
    category: string;
    currency: string;
    average: number,
    quantity: number,
    createdAt: Date;
};

type Output = {
    id: string;
    walletId: string;
    type: 'BUY' | 'SELL';
    name: string;
    category: string;
    currency: string;
    average: number,
    quantity: number,
    createdAt: Date;
};