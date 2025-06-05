import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export default class Save implements UseCase {
    constructor(
        readonly repository: EntryRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { idUser, amount, description, date, category } = input;
        const entry = Entry.create(idUser, amount, description, date, category);
        const idEntry = await this.repository.save(entry);
        return { id: idEntry };
    }
}

type Input = {
    idUser: string,
    amount: number,
    description: string,
    date: number,
    category: string
}

type Output = {
    id: string
}