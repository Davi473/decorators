import Register from '../../application/usecase/user/Register';
import Login from '../../application/usecase/user/Login';
import { Controller, Post, Put, Get } from '../decorators/method';
import UserMe from '../../application/usecase/user/UserMe';
import { Auth } from '../decorators/auth';

@Controller('/users')
export class UserController {

    constructor(
        readonly login: Login,
        readonly register: Register,
        readonly userMe: UserMe
    ) {}

    @Put()
    public async loginUser(req: any, res: any) {
        const input = req.body;
        const output = await this.login.execute(input);
        return output;
    }

    @Post()
    public async registerUser(req: any, res: any) {
        const input = req.body;
        const output = await this.register.execute(input);
        return output;
    }

    @Auth()
    @Get("/me")
    public async meUser(req: any, res: any) {
        const input = req.user;
        const output = await this.userMe.execute(input);
        return output;
    }
}
