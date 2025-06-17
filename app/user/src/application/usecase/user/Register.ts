import User from "../../../domain/entity/User";
import UserRepository from "../../repository/UserRepository";
import UseCase from "../UseCase";

export default class Register implements UseCase {
    constructor(
        readonly repository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { userName, userEmail, userPassword } = input;
        if (await this.repository.findByEmail(userEmail))
            throw new Error("Email ja esta sendo usado");
        const user = User.create(userName, userEmail, userPassword);
        await this.repository.save(user);
        return { message: "User registered successfully" };
    }
}

type Input = {
    userName: string,
    userEmail: string,
    userPassword: string
}

type Output = {
    message: string
}