import WalletRepository from "../../repository/WalletRepository";
import TransactionRepository from "../../repository/TransactionRepository";
import UseCase from "../UseCase";
import Asset from "../../../domain/entity/Asset";
import Transaction from "../../../domain/entity/Transaction";

/**
 * Caso de uso para buscar todas as carteiras de um usuário,
 * calcular seus saldos com base nas transações e retornar os dados resumidos.
 */
export default class GetWallets implements UseCase {
    /**
     * @param walletRepository Repositório de carteiras
     * @param transactionRepository Repositório de transações
     */
    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly transactionRepository: TransactionRepository,
    ) {}

    /**
     * Executa a busca das carteiras do usuário, calcula os saldos e retorna os dados.
     * @param input Objeto contendo o userId
     * @returns Lista de carteiras com id, nome, moeda e saldo
     */
    async execute(input: Input): Promise<Output> {
        const wallets = await this.walletRepository.findByIdUser(input.userId);
        if (!wallets?.length) return [];

        await Promise.all(wallets.map(async (wallet) => {
            const transactions = await this.transactionRepository.findByIdWallet(wallet.id);
            if (!transactions?.length) return;

            const grouped = this.groupTransactionsByCategoryAndName(transactions);
            const assets = this.calculateAssetsFromGroupedTransactions(grouped);
            wallet.calculateBalance(assets);
        }));

        return wallets.map(wallet => ({
            id: wallet.id,
            name: wallet.getName(),
            currency: wallet.getCurrency(),
            balance: wallet.getBalance(),
        }));
    }

    /**
     * Agrupa as transações por categoria e nome.
     * @param transactions Lista de transações
     * @returns Objeto agrupado por categoria e nome
     */
    private groupTransactionsByCategoryAndName(transactions: Transaction[]) {
        return transactions.reduce<Record<string, Record<string, Transaction[]>>>((acc, transaction) => {
            acc[transaction.category] ??= {};
            acc[transaction.category][transaction.name] ??= [];
            acc[transaction.category][transaction.name].push(transaction);
            return acc;
        }, {});
    }

    /**
     * Calcula os ativos a partir das transações agrupadas.
     * @param grouped Transações agrupadas por categoria e nome
     * @returns Lista de ativos calculados
     */
    private calculateAssetsFromGroupedTransactions(grouped: Record<string, Record<string, Transaction[]>>): Asset[] {
        const assets: Asset[] = [];
        for (const [category, names] of Object.entries(grouped)) {
            for (const [name, transactions] of Object.entries(names)) {
                const totalQuantity = transactions.reduce((sum, t) => sum + t.quantity, 0);
                const totalValue = transactions.reduce((sum, t) => sum + (t.average * t.quantity), 0);
                const average = totalQuantity > 0 ? totalValue / totalQuantity : 0;
                const { currency } = transactions[0];
                assets.push(Asset.create(name, currency, category, average, totalQuantity));
            }
        }
        return assets;
    }
}

/**
 * Parâmetros de entrada para o caso de uso GetWallets.
 */
type Input = {
    userId: string;
};

/**
 * Estrutura de saída do caso de uso GetWallets.
 */
type Output = {
    id: string;
    name: string;
    currency: string;
    balance: number;
}[];