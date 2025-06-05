import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export default class GetIdEntry implements UseCase {
    constructor(
        readonly repository: EntryRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { id, idUser } = input;
        const entry = await this.repository.findById(id, idUser);
        return { 
            id: entry.id, amount: entry.getAmount(),
            description: entry.getDescription(), date: entry.getDate(),
            category: entry.getCategory()
        }
    }
}

type Input = {
    id: string,
    idUser: string,
}

type Output = {
    id: string,
    amount: number,
    description: string,
    date: number,
    category: string
}