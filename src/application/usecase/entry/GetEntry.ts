import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export default class GetEntry implements UseCase {
    constructor(
        readonly repository: EntryRepository
    ) {}

    public async execute(input: Input): Promise<Output[]> {
        const { id, name } = input;
        const entrys = await this.repository.findByIdUser(id);
        return entrys.reduce((output: Output[], entry: Entry) => {
            output.push({ 
                id: entry.id, amount: entry.getAmount(),
                description: entry.getDescription(), date: entry.getDate(),
                category: entry.getCategory()
            });
            return output;
        },[]);
    }
}

type Input = {
    id: string,
    name: number,
}

type Output = {
    id: string,
    amount: number,
    description: string,
    date: number,
    category: string
}