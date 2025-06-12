import MonthEntry from "../../../domain/entity/MonthEntry";
import EntryRepository from "../../../infra/repository/EntryRepository";
import { ConvertCurrencyServiceCdn } from "../../../infra/service/ConvertCurrencyService";
import UseCase from "../UseCase";

export class GetMonthEntry implements UseCase {
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entries = await this.entryRepository.findByIdUser(input.idUser);
    const convertCurrency = new ConvertCurrencyServiceCdn();
    await convertCurrency.getCurrency();
    const month = new MonthEntry(entries);
    month.calculate(convertCurrency, input.currencyUser);
    return { month: month.getMonth() };
  }
}

type Input = {
  idUser: string;
  currencyUser: string;
};

type Output = any
