import UserRepository from "../../application/repository/UserRepository";
import fs from "fs/promises";
import path from "path";
import User from "../../domain/entity/User";

/**
 * Implementação de UserRepository que utiliza um arquivo JSON para persistência dos dados dos usuários.
 */
export class UserRepositoryJson implements UserRepository {
    /**
     * Caminho absoluto para o arquivo JSON onde os usuários são armazenados.
     */
    public DATA_PATH = path.resolve(__dirname, "../../../data/users.json");

    /**
     * Lê todos os usuários do arquivo JSON.
     * @returns Promise com a lista de usuários.
     */
    private async readUsers(): Promise<any[]> {
        try {
            const data = await fs.readFile(this.DATA_PATH, "utf-8");
            return JSON.parse(data);
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code === "ENOENT") {
                // Retorna lista vazia se o arquivo não existir.
                return [];
            }
            throw err;
        }
    }

    /**
     * Escreve a lista de usuários no arquivo JSON.
     * @param users Lista de usuários a ser salva.
     */
    private async writeUsers(user: User): Promise<void> {
        const users = await this.readUsers();
        users.push({name: user.getName(), email: user.getEmail(), id: user.id, currency: user.getCurrency(), hash: user.getHash()});
        await fs.writeFile(this.DATA_PATH, JSON.stringify(users, null, 2), "utf-8");
    }

    /**
     * Salva um usuário. Se já existir, atualiza; senão, adiciona.
     * @param user Usuário a ser salvo.
     */
    public async save(user: User): Promise<void> {
        await this.writeUsers(user);
    }

    /**
     * Busca um usuário pelo e-mail.
     * @param email E-mail do usuário.
     * @returns Promise com o usuário encontrado ou undefined.
     */
    public async findByEmail(email: string): Promise<User | undefined> {
        const users = await this.readUsers();
        const user = users.find(u => u.email === email);
        return user ? new User(user.id, user.name, user.email, user.currency, user.hash) : undefined;
    }

    /**
     * Busca um usuário pelo id e nome.
     * @param id ID do usuário.
     * @param name Nome do usuário.
     * @returns Promise com o usuário encontrado ou undefined.
     */
    public async findByIdAndName(id: string, name: string): Promise<User | undefined> {
        const users = await this.readUsers();
        const user = users.find(u => u.id === id && u.name === name);
        return user ? new User(user.id, user.name, user.email, user.currency, user.hash) : undefined;
    }
}