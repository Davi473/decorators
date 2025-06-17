import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/entity/User";

export class UserRepositoryMemory implements UserRepository {
    private memory: User[] = [];
    public async save(user: User): Promise<void> {
        this.memory.push(user);
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