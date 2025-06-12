import { UserController } from "./infra/controller/UserController";
import Login from "./application/usecase/user/Login";
import { UserRepositoryMemory } from "./infra/repository/UserRepository";
import Register from "./application/usecase/user/Register";
import UserMe from "./application/usecase/user/UserMe";

const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;

const userRepository = new UserRepositoryMemory();
const login = new Login(userRepository)
const register = new Register(userRepository)
const userMe = new UserMe(userRepository);
const userController = new UserController(login, register, userMe);
HTTP.registerRoutes(userController);