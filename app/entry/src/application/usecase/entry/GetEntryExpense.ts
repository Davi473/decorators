import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class GetEntryExpense implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entries = await this.entryRepository.findExpense(input);
    return entries.reduce((acc: Output, entry: Entry) => {
      acc.push(entry.json());
      return acc;
    }, []);
  }
}

type Entry = {
    idUser: string
}

type Output = any[]
