import WalletRepository from "../../repository/WalletRepository";
import UseCase from "../UseCase";

export default class GetWallets implements UseCase {

    constructor(
        private readonly walletRepository: WalletRepository,
    ) {}

    async execute(input: any): Promise<any> {
        const wallet = await this.walletRepository.findByIdUser(input.id);
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        return wallet;
    }

}