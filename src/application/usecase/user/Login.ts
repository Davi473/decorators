import UserRepository from "../../../infra/repository/UserRepository";
import User from "../../../domain/entity/User";
import UseCase from "../UseCase";
import { generateToken } from "../../../infra/middlewares/tokenAuth";

export default class Login implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { email, password } = input;
        const user = await this.repository.findByEmail(email);
        if (!user) throw new Error("Email não existe");
        if (!user.verifyPassword(password)) throw new Error("Senha incorreta");
        const token = generateToken({id: user.id, name: user.getName()});
        return { token };
    }
}

type Input = {
    email: string,
    password: string
}

type Output = {
    token: string
}