import User from "../../domain/entity/User";

export default interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
    findByIdAndName(id: string, name: string): Promise<User | undefined>;
}