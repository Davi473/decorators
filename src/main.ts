import createServer, {registerRoutes} from "./infra/express/express";

import { UserController } from "./infra/controller/UserController";


const PORT = 3000;
const server = createServer();

new UserController()

const userController: any = new UserController();
console.log(userController.constructor.__routes, "aqui")
// registerRoutes(UserController);

server.listen(PORT);


