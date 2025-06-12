import UserRepository from "../../../infra/repository/UserRepository";
import User from "../../../domain/entity/User";
import UseCase from "../UseCase";

export default class Register implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { name, email, password } = input;
        if (await this.repository.findByEmail(email))
            throw new Error("Email ja esta sendo usado");
        const user = User.create(name, email, password);
        const id = await this.repository.save(user);
        return { id };
    }
}

type Input = {
    name: string,
    email: string,
    password: string
}

type Output = {
    id: string
}