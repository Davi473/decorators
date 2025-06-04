import { Request, Response } from 'express';
import { Controller, Get, Auth } from '../express/express';

@Controller('/users')
export class UserController {

    constructor() {}

    @Auth()
    @Get('/profile')
    public getProfile(req: Request, res: Response) {
        const user = (req as any).user;
        res.send(`Perfil: ${user.name}`);
    }

    @Get('/public')
    public getPublic(req: Request, res: Response) {
        return 'Rota pública';
    }
}
