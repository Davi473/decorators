import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export default class DeleteEntry implements UseCase {
    constructor(
        readonly repository: EntryRepository
    ) {}

    public async execute(input: Input): Promise<void> {
        const { id, idUser } = input;
        await this.repository.delete(id, idUser);
    }
}

type Input = {
    id: string,
    idUser: string,
}
