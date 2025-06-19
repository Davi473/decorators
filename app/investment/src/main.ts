import { HttpServerAdaptorExpress } from "./infra/http/HttpServer";
import { WalletRepositoryJson } from "./infra/repository/WalletRepositoryJson";
import { WalletController } from "./infra/controller/WalletController";
import CreateWallet from "./application/usecase/wallet/CreateWallet";

const PORT = 3001;
const HTTP = new HttpServerAdaptorExpress();

const walletRepository = new WalletRepositoryJson();
const walletController = new WalletController(
  new CreateWallet(walletRepository)
);
HTTP.registerRoutes(walletController);

HTTP.listen(PORT);