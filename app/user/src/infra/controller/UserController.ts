import Register from '../../application/usecase/user/Register';
import Login from '../../application/usecase/user/Login';
import { Controller, Post, Put, Get, Body } from '../decorators/method';
import UserMe from '../../application/usecase/user/UserMe';
import { Auth, UserAuth } from '../decorators/auth';

@Controller('/users')
export class UserController {

    constructor(
        readonly login: Login,
        readonly register: Register,
        readonly userMe: UserMe
    ) {}

    @Put()
    public async loginUser(@Body() user: PutUser, res: any) {
        const input = user;
        const output = await this.login.execute(input);
        res.status(201).json(output);
    }

    @Post()
    public async registerUser(@Body() user: PostUser, res: any) {
        const input = user;
        const output = await this.register.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get("/me")
    public async meUser(@UserAuth() user: GetMe, res: any) {
        const input = user;
        const output = await this.userMe.execute(input);
        return output;
    }
}

type PutUser = { email: string, password: string };
type PostUser = { name: string, email: string, password: string };
type GetMe = { idUser: string, name: string };