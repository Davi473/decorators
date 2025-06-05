import Entry from "../../domain/entity/Entry";

export default interface EntryRepository {
    save(entry: Entry): Promise<string>;
    findById(id: string, idUser: string): Promise<Entry>;
    findByIdUser(idUser: string): Promise<Entry[]>;
    delete(id: string, idUser: string): Promise<void>;
}

export class EntryRepositoryMemory implements EntryRepository {
    private memory: Entry[] = [];

    public async save(entry: Entry): Promise<string> {
        this.memory.push(entry);
        return entry.id;
    }

    public async findById(id: string, idUser: string): Promise<Entry> {
        const [entry] = this.memory.filter(entry => 
            ((entry.id === id) && (entry.idUser === idUser)))
        return entry;
    }

    public async findByIdUser(idUser: string): Promise<Entry[]> {
        const entry = this.memory.filter(entry => entry.idUser === idUser)
        return entry;
    }

    public async delete(id: string, idUser: string): Promise<void> {
        const index = this.memory.findIndex(entry => 
            entry.id === id && entry.idUser === idUser);

        if (index === -1) {
            throw new Error('Entry not found');
        }
    }
}