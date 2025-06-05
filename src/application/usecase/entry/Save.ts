import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export default class Save implements UseCase {
    constructor(
        readonly repository: EntryRepository
    ) {}

    public async execute(input: Input): Promise<Output> {
        const { id, amount, description, date, category } = input;
        const entry = Entry.create(id, amount, description, date, category);
        const idEntry = await this.repository.save(entry);
        return { id: idEntry };
    }
}

type Input = {
    id: string,
    amount: number,
    description: string,
    date: number,
    category: string
}

type Output = {
    id: string
}