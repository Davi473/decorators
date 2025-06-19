import { WalletRepositoryJson } from "../src/infra/repository/WalletRepositoryJson";
import { TransactionRepositoryJson } from "../src/infra/repository/TransactionRepositoryJson";
import CreateWallet from "../src/application/usecase/wallet/CreateWallet";
import GetWallets from "../src/application/usecase/wallet/GetWallets";
import AddTransaction from "../src/application/usecase/transaction/AddTransaction";

test("Test Create Wallet", async () => {    
    const repository = new WalletRepositoryJson();
    const createdWallet = new CreateWallet(repository);
    const wallet = await createdWallet.execute({
        userId: `${Math.floor(Math.random() * 1000000)}`,
        name: "Stocks",
        currency: "USD"
    });
});

test("Test Create Transaction", async () => {    
    const walletRepository = new WalletRepositoryJson();
    const createdWallet = new CreateWallet(walletRepository);
    const wallet = await createdWallet.execute({
        userId: `${Math.floor(Math.random() * 1000000)}`,
        name: "Stocks",
        currency: "USD"
    });
    const transactionRepository = new TransactionRepositoryJson();
    const addTransaction = new AddTransaction(transactionRepository);
    const transaction = await addTransaction.execute({
        walletId: wallet.id,
        type: "BUY",
        name: "VALE",
        category: "stocks",
        currency: "USD",
        average: 8.3,
        quantity: 1.3,
        createdAt: new Date(),    
    });
});


test("Test Create Transaction", async () => {    
    const walletRepository = new WalletRepositoryJson();
    const createdWallet = new CreateWallet(walletRepository); 
    const user = `${Math.floor(Math.random() * 1000000)}`   
    const wallet = await createdWallet.execute({
        userId: user,
        name: "Stocks",
        currency: "USD"
    });
    const transactionRepository = new TransactionRepositoryJson();
    const addTransaction = new AddTransaction(transactionRepository);
    await addTransaction.execute({
        walletId: wallet.id,
        type: "BUY",
        name: "VALE",
        category: "stocks",
        currency: "USD",
        average: 8.83,
        quantity: 1.13314,
        createdAt: new Date(),    
    });
    await addTransaction.execute({
        walletId: wallet.id,
        type: "BUY",
        name: "VALE",
        category: "stocks",
        currency: "USD",
        average: 8.34,
        quantity: 0.5997,
        createdAt: new Date(),    
    });

    const wallet2 = await createdWallet.execute({
        userId: user,
        name: "Stocks",
        currency: "USD"
    });
    await addTransaction.execute({
        walletId: wallet2.id,
        type: "BUY",
        name: "BRAD",
        category: "stocks",
        currency: "USD",
        average: 3.42,
        quantity: 0.5997,
        createdAt: new Date(),    
    });
    const getWallets = new GetWallets(walletRepository, transactionRepository);
    const values = await getWallets.execute({
        userId: user
    });
    console.log(values);
});
