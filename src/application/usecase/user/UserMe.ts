import UserRepository from "../../../infra/repository/UserRepository";
import UseCase from "../UseCase";

export default class UserMe implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { id, name } = input;
        const user = await this.repository.findByIdAndName(id, name)
        if (!user) throw new Error("Usuario não existe");
        return { id, name, email: user.getEmail() };
    }
}

type Input = {
    id: string,
    name: string
}

type Output = {
    id: string,
    name: string,
    email: string
}