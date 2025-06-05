import DeleteEntry from "../../application/usecase/entry/DeleteEntry";
import GetEntry from "../../application/usecase/entry/GetEntry";
import GetIdEntry from "../../application/usecase/entry/GetIdEntry";
import Save from "../../application/usecase/entry/Save";
import { Auth } from "../decorators/auth";
import { Controller, Get, Post, Delete } from "../decorators/method";

@Controller("/entry")
export default class EntryController {
    constructor(
        readonly save: Save,
        readonly getEntry: GetEntry,
        readonly getIdEntry: GetIdEntry,
        readonly deleteEntry: DeleteEntry
    ) {}

    @Auth()
    @Get()
    public async get(req: any, res: any): Promise<any> {
        const input = req.user;
        const output = await this.getEntry.execute(input);
        return output;
    }

    @Auth()
    @Post()
    public async post(req: any, res: any): Promise<any> {
        const input = { ...req.user, ...req.body };
        const output = await this.save.execute(input);
        return output;
    }

    @Auth()
    @Get("/:id")
    public async id(req: any, res: any): Promise<any> {
        const input = { id: req.params.id, idUser: req.user.id };
        const output = await this.getIdEntry.execute(input);
        return output;
    }

    @Auth()
    @Delete()
    public async delete(req: any, res: any): Promise<any> {
        const input = { id: req.params.id, idUser: req.user.id };
        const output = await this.deleteEntry.execute(input);
        return output;
    }
}