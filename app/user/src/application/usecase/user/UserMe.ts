import UserRepository from "../../../infra/repository/UserRepository";
import UseCase from "../UseCase";

export default class UserMe implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { idUser, name } = input;
        const user = await this.repository.findByIdAndName(idUser, name)
        if (!user) throw new Error("Usuario não existe");
        return { idUser, name, email: user.getEmail(), idCurrency: user.getCurrency() };
    }
}

type Input = {
    idUser: string,
    name: string
}

type Output = {
    idUser: string,
    name: string,
    email: string,
    idCurrency: string
}