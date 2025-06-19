import Transaction from "../../domain/entity/Transaction";

export default interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findByIdWallet(idWallet: string): Promise<Transaction[] | undefined>;
}