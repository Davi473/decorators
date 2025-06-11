import User from "../../domain/entity/User";

export default interface UserRepository {
    save(user: User): Promise<string>;
    findByEmail(email: string): Promise<User>;
    findByIdAndName(id: string, name: string): Promise<User>;
}


export class UserRepositoryMemory implements UserRepository {
    private memory: User[] = [];
    public async save(user: User): Promise<string> {
        this.memory.push(user);
        return user.id;
    }
    public async findByEmail(email: string): Promise<User> {
        const [user] = this.memory.filter(user => user.getEmail() === email);
        return user;
    }
    public async findByIdAndName(id: string, name: string): Promise<User> {
        const [user] = this.memory.filter(user => (user.id === id) && (user.getName() === name));
        return user;
    }
}