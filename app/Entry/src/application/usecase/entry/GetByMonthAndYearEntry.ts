import Entry from "../../../domain/entity/Entry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class GetByMonthAndYearEntry implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    const { idUser, month, year } = input;
    const entries = await this.entryRepository.findByMonthAndYear(idUser, month, year);
    return entries.reduce((acc: Output, entry: Entry) => {
      acc.push(entry.json());
      return acc;
    }, []);
  }
}

type Input = {
    idUser: string;
    month: number;
    year: number;
}

type Output = any[]
