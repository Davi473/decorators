import { generateToken } from "../../../infra/middlewares/tokenAuth";
import UserRepository from "../../repository/UserRepository";
import UseCase from "../UseCase";

export default class Login implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { userEmail, userPassword } = input;
        const user = await this.repository.findByEmail(userEmail);
        if (!user) throw new Error("Email não existe");
        if (!user.verifyPassword(userPassword)) throw new Error("Senha incorreta");
        const token = generateToken({idUser: user.id, name: user.getName(), currencyUser: user.getCurrency()});
        return { token };
    }
}

type Input = {
    userEmail: string,
    userPassword: string
}

type Output = {
    token: string
}