import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class GetEntry implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(): Promise<Output> {
    const entries = await this.entryRepository.findAll();
    return entries.reduce((acc: Output, entry: Entry) => {
      acc.push(entry.json());
      return acc;
    }, []);
  }
}

type Output = any[]
