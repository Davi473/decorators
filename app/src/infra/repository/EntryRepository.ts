import Entry from "../../domain/entity/Entry";

export default interface EntryRepository {
    add(entry: Entry): Promise<void>;
    findById(id: string): Promise<Entry | undefined>;
    findByIdUser(idUser: string): Promise<Entry[]>;
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

    async findAll(): Promise<Entry[]> {
        return [...this.entries];
    }
}