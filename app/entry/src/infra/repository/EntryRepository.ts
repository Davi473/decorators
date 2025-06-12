import Entry from "../../domain/entity/Entry";

export default interface EntryRepository {
    add(entry: Entry): Promise<void>;
    findById(id: string): Promise<Entry | undefined>;
    findByIdUser(idUser: string): Promise<Entry[]>;
    findByMonthAndYear(idUser: string, month: number, year: number): Promise<Entry[]>;
    findExpense(idUser: number): Promise<EntryExpense>;
    findAll(): Promise<Entry[]>;
}

export class EntryRepositoryMemory implements EntryRepository {
    private entries: Entry[] = [];

    async add(entry: Entry): Promise<void> {
        this.entries.push(entry);
    }

    async findById(id: string): Promise<Entry | undefined> {
        return this.entries.find(entry => entry.id === id);
    }
    
    async findByIdUser(idUser: string): Promise<Entry[]> {
        return this.entries.filter(entry => entry.idUser === idUser);
    }

    async findByMonthAndYear(idUser: string, month: number, year: number): Promise<Entry[]> {
        return this.entries.filter(entry => {
            const entryDate = new Date(`${entry.getDate()}T03:00:00`);
            return entryDate.getMonth() + 1 === month && entryDate.getFullYear() === year && entry.idUser === idUser;
        });
    }

    async findExpense(idUser: number): Promise<EntryExpense> {
        return this.entries.filter(entry => entry.idUser === idUser && entry.getCategory() === "expense");
    }

    async findAll(): Promise<Entry[]> {
        return [...this.entries];
    }
}