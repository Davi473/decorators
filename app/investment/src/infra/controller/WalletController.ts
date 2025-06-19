import { Controller, Post, Put, Get, Body } from '../decorators/method';
import { CreateWallet } from '../usecase/CreateWallet';
import { Auth, UserAuth } from '../decorators/auth';

@Controller('/wallets')
export class WalletController {

    constructor(
        readonly createWallet: CreateWallet,
    ) {}

    @Auth()
    @Post()
    public async create(@Body() wallet: any, @UserAuth() user: any, res: any) {
        const input = { ...wallet, userId: user.idUser };
        const output = await this.createWallet.execute(input);
        res.status(201).json(output);
    }
}
