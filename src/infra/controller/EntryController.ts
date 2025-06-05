import DeleteEntry from "../../application/usecase/entry/DeleteEntry";
import GetEntry from "../../application/usecase/entry/GetEntry";
import GetIdEntry from "../../application/usecase/entry/GetIdEntry";
import Save from "../../application/usecase/entry/Save";
import { Auth, UserAuth } from "../decorators/auth";
import { Controller, Get, Post, Delete, Body, Params } from "../decorators/method";

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
    public async get(@UserAuth() user: User): Promise<any> {
        const input = user;
        const output = await this.getEntry.execute(input);
        return output;
    }

    @Auth()
    @Post()
    public async post(
        @Body() entry: any,
        @UserAuth() user: User
    ): Promise<any> {
        const input = { ...user, ...entry };
        const output = await this.save.execute(input);
        return output;
    }

    @Auth()
    @Get("/:id")
    public async id(
        @Params() id: any,
        @UserAuth() user : User
    ): Promise<any> {
        const input = { ...id, ...user };
        const output = await this.getIdEntry.execute(input);
        return output;
    }

    @Auth()
    @Delete()
    public async delete(
        @Params() id: any,
        @UserAuth() user: User
    ): Promise<any> {
        const input = { ...id, ...user };
        const output = await this.deleteEntry.execute(input);
        return output;
    }
}

type User = {
    idUser: string,
    name: string
}