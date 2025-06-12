import Entry from "./Entry";

export default class EntryIncome extends Entry {
    constructor(
        id: string,
        idUser: string,
        description: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ) {
        super(id, idUser, description, category, amount, currency, date);
    }

    static create(
        idUser: string,
        name: string,
        category: string,
        amount: number,
        currency: string,
        date: string
    ): EntryIncome {
        return new EntryIncome(
            crypto.randomUUID(),
            idUser,
            name,
            category,
            amount,
            currency,
            date
        );
    }

    public json(): object {
        const json = super.json();
        return {
            ...json,
        };
    }
}