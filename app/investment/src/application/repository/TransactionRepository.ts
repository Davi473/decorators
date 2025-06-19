import Transaction from "../../domain/entity/Transaction";

export default interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findByIdUser(idUser: string): Promise<Transaction | undefined>;
    findByIdAndIdWallet(id: string, idWallet: string): Promise<Transaction | undefined>;
}