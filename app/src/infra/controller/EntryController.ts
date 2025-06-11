import { Controller, Post, Get, Body, Params } from '../decorators/method';
import { Auth, UserAuth } from '../decorators/auth';
import { GetByIdEntry } from '../../application/usecase/entry/GetByIdEntry';
import { Save } from '../../application/usecase/entry/Save';
import { GetEntry } from '../../application/usecase/entry/GetEntry';
import { GetMonthEntry } from '../../application/usecase/entry/GetMonthEntry';
import { GetByMonthAndYearEntry } from '../../application/usecase/entry/GetByMonthAndYearEntry';

@Controller('/entry')
export class EntryController {

    constructor(
        readonly getByIdEntry: GetByIdEntry,
        readonly saveEntry: Save,
        readonly getEntry: GetEntry,
        readonly getMonthEntry: GetMonthEntry,
        readonly getByMonthAndYearEntry: GetByMonthAndYearEntry
    ) {}

    @Auth()
    @Get()
    public async get(@UserAuth() user: any) {
        const input = user;
        const output = await this.getByIdEntry.execute(input);
        return output;
    }

    @Auth()
    @Post()
    public async save(@Body() entry: any, @UserAuth() user: any) {
        const input = { ...entry, idUser: user.idUser };
        const output = await this.saveEntry.execute(input);
        return output;
    }

    @Get("/admin")
    public async getAdmin() {
        const output = await this.getEntry.execute();
        return output;
    }

    @Auth()
    @Get("/month")
    public async getMount(@UserAuth() user: any) {
        const input = user;
        const output = await this.getMonthEntry.execute(input);
        return output;
    }

    @Auth()
    @Get("/month/:month/year/:year")
    public async getByMountAndYear(@Params() date: any, @UserAuth() user: any) {
        const input = {...date, ...user};
        const output = await this.getMonthEntry.execute(input);
        return output;
    }
}