import WalletRepository from "../../repository/WalletRepository";
import TransactionRepository from "../../repository/TransactionRepository";
import UseCase from "../UseCase";
import Asset from "../../../domain/entity/Asset";
import Transaction from "../../../domain/entity/Transaction";

export default class GetWallets implements UseCase {

    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly transactionRepository: TransactionRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { userId } = input;
        const wallets = await this.walletRepository.findByIdUser(userId);
        if (!wallets) return [];
        for (const wallet of wallets) {
            const transactions = await this.transactionRepository.findByIdWallet(wallet.id);
            if (!transactions) continue;
            const grouped = transactions.reduce<Record<string, Record<string, Transaction[]>>>((acc, transaction) => {
                if (!acc[transaction.category]) {
                acc[transaction.category] = {};
                }
                if (!acc[transaction.category][transaction.name]) {
                acc[transaction.category][transaction.name] = [];
                }
                acc[transaction.category][transaction.name].push(transaction);
                return acc;
            }, {});

            // Calcula os ativos a partir das categorias e nomes agrupados
            const assets: Asset[] = [];
            Object.entries(grouped).forEach(([category, names]) => {
                Object.entries(names).forEach(([name, transactions]) => {
                const totalQuantity = transactions.reduce((sum, t) => sum + t.quantity, 0);
                const totalValue = transactions.reduce((sum, t) => sum + (t.average * t.quantity), 0);
                const average = totalQuantity > 0 ? totalValue / totalQuantity : 0;
                const { currency } = transactions[0];
                assets.push(Asset.create(name, currency, category, average, totalQuantity));
                });
            });
            wallet.calculateBalance(assets);
        };
        return wallets.map(wallet => ({
            id: wallet.id,
            name: wallet.getName(),
            currency: wallet.getCurrency(),
            balance: wallet.getBalance(),
        }));
    }
}

type Input = {
    userId: string;
};

type Output = {
    id: string;
    name: string;
    currency: string;
    balance: number;
}[];