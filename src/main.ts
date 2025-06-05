import { HttpServerAdaptorExpress } from "./infra/express/express";

import { UserController } from "./infra/controller/UserController";
import Login from "./application/usecase/user/Login";
import { UserRepositoryMemory } from "./infra/repository/UserRepository";
import Register from "./application/usecase/user/Register";
import UserMe from "./application/usecase/user/UserMe";
import EntryController from "./infra/controller/EntryController";
import { EntryRepositoryMemory } from "./infra/repository/EntryRepository";
import Save from "./application/usecase/entry/Save";
import GetIdEntry from "./application/usecase/entry/GetIdEntry";
import GetEntry from "./application/usecase/entry/GetEntry";
import DeleteEntry from "./application/usecase/entry/DeleteEntry";


const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;

const userRepository = new UserRepositoryMemory();
const login = new Login(userRepository)
const register = new Register(userRepository)
const userMe = new UserMe(userRepository);
const userController = new UserController(login, register, userMe);
HTTP.registerRoutes(userController);

const entryRepository = new EntryRepositoryMemory();
const save = new Save(entryRepository);
const getIdEntry = new GetIdEntry(entryRepository);
const getEntry = new GetEntry(entryRepository);
const deleteEntry = new DeleteEntry(entryRepository);
const entryController = new EntryController(save, getEntry, getIdEntry, deleteEntry);
HTTP.registerRoutes(entryController);

HTTP.listen(PORT);