import Entry from "../../../domain/entity/Entry";
import EntryExpense from "../../../domain/entity/EntryExpense";
import EntryIncome from "../../../domain/entity/EntryIncome";
import EntryRepository from "../../../infra/repository/EntryRepository";
import UseCase from "../UseCase";

export class Save implements UseCase { 
  constructor(private readonly entryRepository: EntryRepository) {}

  async execute(input: Input): Promise<Output> {
    let entry: Entry;
    if (isInputExpense(input)) {
        entry = EntryExpense.create(
            input.idUser,
            input.name,
            input.category,
            input.amount,
            input.currency,
            input.dayToPay,
        );
    } else {
        entry = EntryIncome.create(
            input.idUser,
            input.name,
            input.category,
            input.amount,
            input.currency,
            input.date,
        );
    }
    this.entryRepository.add(entry);
    return { id: entry.id };
  }
}

type InputExpense = {
  idUser: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  dayToPay: string;
  amountPaid?: number;
  paidDay?: string;
};
type InputIncome = {
  idUser: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
};
type Input = InputExpense | InputIncome;

type Output = {
    id: string;
}

function isInputExpense(input: Input): input is InputExpense {
  return 'dayToPay' in input;
}