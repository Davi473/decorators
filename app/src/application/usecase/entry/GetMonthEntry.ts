import MonthEntry from "../../../domain/entity/MonthEntry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class GetMonthEntry implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entries = await this.entryRepository.findByIdUser(input.idUser);
    const month = new MonthEntry(entries);
    month.calculate();
    return { month: month.getMonth()};
  }
}

type Input = {
  idUser: string;
};

type Output = any
