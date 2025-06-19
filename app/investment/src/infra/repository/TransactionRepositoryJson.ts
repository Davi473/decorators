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
        transactions.push({id: transaction.id, walletId: transaction.walletId, type: transaction.type, name: transaction.name, category: transaction.category, currency: transaction.currency, average: transaction.average,  quantity: transaction.quantity, createdAt: transaction.createdAt});
        await fs.writeFile(this.DATA_PATH, JSON.stringify(transactions, null, 2), "utf-8");
    }

    /**
     * Salva uma transação. Se já existir, atualiza; senão, adiciona.
     * @param transaction Transação a ser salva.
     */
    public async save(transaction: Transaction): Promise<void> {
        await this.writeTransactions(transaction);
    }

    public async findByIdWallet(idWallet: string): Promise<Transaction[] | undefined> {
        const transactions = await this.readTransactions();
        const transaction = transactions.filter(t => t.walletId === idWallet);
        return transaction ? transaction.map(t => t = new Transaction(t.id, t.walletId, t.type, t.name, t.category, t.currency, t.average, t.quantity, t.createdAt)) : undefined;
    }
}