import { HttpServerAdaptorExpress } from "./infra/http/HttpServer";



import { EntryController } from "./infra/controller/EntryController";
import { EntryRepositoryMemory } from "./infra/repository/EntryRepository";
import { GetByIdEntry } from "./application/usecase/entry/GetByIdEntry";
import { Save } from "./application/usecase/entry/Save";
import { GetEntry } from "./application/usecase/entry/GetEntry";
import { GetMonthEntry } from "./application/usecase/entry/GetMonthEntry";
import { GetByMonthAndYearEntry } from "./application/usecase/entry/GetByMonthAndYearEntry";

const HTTP = new HttpServerAdaptorExpress();
const PORT = 3000;

const userRepository = new UserRepositoryMemory();
const login = new Login(userRepository)
const register = new Register(userRepository)
const userMe = new UserMe(userRepository);
const userController = new UserController(login, register, userMe);
HTTP.registerRoutes(userController);

const entryRepository = new EntryRepositoryMemory();
const saveEntry = new Save(entryRepository);
const getByIdEntry = new GetByIdEntry(entryRepository);
const getEntry = new GetEntry(entryRepository);
const getMonthEntry = new GetMonthEntry(entryRepository);
const getByMonthAndYearEntry = new GetByMonthAndYearEntry(entryRepository);
const entryController = new EntryController(getByIdEntry, saveEntry, getEntry, getMonthEntry, getByMonthAndYearEntry);
HTTP.registerRoutes(entryController);

HTTP.listen(PORT);