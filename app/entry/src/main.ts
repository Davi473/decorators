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

const entryRepository = new EntryRepositoryMemory();
const saveEntry = new Save(entryRepository);
const getByIdEntry = new GetByIdEntry(entryRepository);
const getEntry = new GetEntry(entryRepository);
const getMonthEntry = new GetMonthEntry(entryRepository);
const getByMonthAndYearEntry = new GetByMonthAndYearEntry(entryRepository);
const entryController = new EntryController(getByIdEntry, saveEntry, getEntry, getMonthEntry, getByMonthAndYearEntry);
HTTP.registerRoutes(entryController);

HTTP.listen(PORT);