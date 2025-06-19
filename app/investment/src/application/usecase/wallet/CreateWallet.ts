import WalletRepository from "../../repository/WalletRepository";
import Wallet from "../../../domain/entity/Wallet";
import UseCase from "../UseCase";

export default class CreateWallet implements UseCase {

    constructor(
        private readonly walletRepository: WalletRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const  { userId, name, currency }: Input = input;
        const wallet = Wallet.create(userId, name, currency);
        await this.walletRepository.save(wallet);
        return { 
            id: wallet.id, name: wallet.getName(),
            currency: wallet.getCurrency(), createdAt: wallet.createdAt
        }
    }

}

type Input = {
    userId: string;
    name: string;
    currency: string
};

type Output = {
    id: string;
    name: string;
    currency: string;
    createdAt: Date;
};