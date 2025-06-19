import { UserController } from "./infra/controller/UserController";
import Login from "./application/usecase/user/Login";
import { UserRepositoryMemory } from "./infra/repository/UserRepositoryMemory";
import { UserRepositoryJson } from "./infra/repository/WalletRepositoryJson";
import Register from "./application/usecase/user/Register";
import UserMe from "./application/usecase/user/UserMe";
import { HttpServerAdaptorExpress } from "./infra/http/HttpServer";

const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;

const userRepository = new UserRepositoryJson();
const login = new Login(userRepository)
const register = new Register(userRepository)
const userMe = new UserMe(userRepository);
const userController = new UserController(login, register, userMe);
HTTP.registerRoutes(userController);

HTTP.listen(PORT);