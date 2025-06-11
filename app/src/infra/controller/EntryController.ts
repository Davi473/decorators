import { Controller, Post, Get, Body } from '../decorators/method';
import { Auth, UserAuth } from '../decorators/auth';
import { GetByIdEntry } from '../../application/usecase/entry/GetByIdEntry';
import { Save } from '../../application/usecase/entry/Save';
import { GetEntry } from '../../application/usecase/entry/GetEntry';

@Controller('/entry')
export class EntryController {

    constructor(
        readonly getByIdEntry: GetByIdEntry,
        readonly saveEntry: Save,
        readonly getEntry: GetEntry
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

}