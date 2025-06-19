import fs from "fs/promises";
import path from "path";
import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/entity/Transaction";

/**
 * Implementação de TransactionRepository que utiliza um arquivo JSON para persistência dos dados das transações.
 */
export class TransactionRepositoryJson implements TransactionRepository {
    /**
     * Caminho absoluto para o arquivo JSON onde as transações são armazenadas.
     */
    public DATA_PATH = path.resolve(__dirname, "../../../data/transactions.json");

    /**
     * Lê todas as transações do arquivo JSON.
     * @returns Promise com a lista de transações.
     */
    private async readTransactions(): Promise<any[]> {
        try {
            const data = await fs.readFile(this.DATA_PATH, "utf-8");
            return JSON.parse(data);
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code === "ENOENT") {
                // Retorna lista vazia se o arquivo não existir.
                return [];
            }
            throw err;
        }
    }

    /**
     * Escreve a lista de wallets no arquivo JSON.
     * @param wallets Lista de wallets a ser salva.
     */
    private async writeTransactions(transaction: Transaction): Promise<void> {
        const transactions = await this.readTransactions();
        // transactions.push({id: transaction.id, userId: transaction.userId, walletId: transaction.walletId, amount: transaction.amount, createdAt: transaction.createdAt});
        await fs.writeFile(this.DATA_PATH, JSON.stringify(transactions, null, 2), "utf-8");
    }

    /**
     * Salva uma transação. Se já existir, atualiza; senão, adiciona.
     * @param transaction Transação a ser salva.
     */
    public async save(transaction: Transaction): Promise<void> {
        await this.writeTransactions(transaction);
    }

    /**
     * Busca uma transação pelo id do usuário.
     * @param idUser ID do usuário.
     * @returns Promise com a transação encontrada ou undefined.
     */
    public async findByIdUser(idUser: string): Promise<Transaction | undefined> {
        const transactions = await this.readTransactions();
        const transaction = transactions.find(t => t.userId === idUser);
        // return transaction ? new Transaction(transaction.id, transaction.userId, transaction.walletId, transaction.amount, transaction.createdAt) : undefined;
    }

    /**
     * Busca uma transação pelo id e id do usuário.
     * @param id ID da transação.
     * @param idUser ID do usuário.
     * @returns Promise com a transação encontrada ou undefined.
     */
    public async findByIdAndIdUser(id: string, idUser: string): Promise<Transaction | undefined> {
        const transactions = await this.readTransactions();
        const transaction = transactions.find(t => t.id === id && t.userId === idUser);
        // return transaction ? new Transaction(transaction.id, transaction.userId, transaction.walletId, transaction.amount, transaction.createdAt) : undefined;
    }

    public async findByIdAndIdWallet(id: string, idWallet: string): Promise<Transaction | undefined> {
        const transactions = await this.readTransactions();
        const transaction = transactions.find(t => t.id === id && t.walletId === idWallet);
        // return transaction ? new Transaction(transaction.id, transaction.userId, transaction.walletId, transaction.amount, transaction.createdAt) : undefined;
    }
}