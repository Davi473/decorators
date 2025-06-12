import User from "../../domain/entity/User";

export default interface UserRepository {
    save(user: User): Promise<string>;
    findByEmail(email: string): Promise<User>;
    findByIdAndName(id: string, name: string): Promise<User>;
}