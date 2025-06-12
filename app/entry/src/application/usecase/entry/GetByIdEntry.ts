import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class GetByIdEntry implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entries = await this.entryRepository.findByIdUser(input.idUser);
    return entries.reduce((acc: Output, entry: Entry) => {
      acc.push(entry.json());
      return acc;
    }, []);
  }
}

type Input = {
  idUser: string;
};

type Output = any[]
