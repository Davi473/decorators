import Repository from "../../application/repository/UserRepository";
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
    private async readUsers(): Promise<User[]> {
        try {
            const data = await fs.readFile(this.DATA_PATH, "utf-8");
            return JSON.parse(data).map((user: any) => {
                // Converte o objeto JSON para uma instância de User.
                return new User(user.id, user.userName, user.email, user.currency, user.hash);
            });
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
    private async writeUsers(users: User[]): Promise<void> {
        await fs.writeFile(this.DATA_PATH, JSON.stringify(users, null, 2), "utf-8");
    }

    /**
     * Salva um usuário. Se já existir, atualiza; senão, adiciona.
     * @param user Usuário a ser salvo.
     */
    public async save(user: User): Promise<void> {
        const users = await this.readUsers();
        users.push({userName: user.getName(), email: user.getEmail(), id: user.id, currency: user.getCurrency(), hash: user.getHash()});
        await this.writeUsers(users);
    }

    /**
     * Busca um usuário pelo e-mail.
     * @param email E-mail do usuário.
     * @returns Promise com o usuário encontrado ou undefined.
     */
    public async findByEmail(email: string): Promise<User> {
        const users = await this.readUsers();
        return users.find(u => u.getEmail() === email);
    }

    /**
     * Busca um usuário pelo id e nome.
     * @param id ID do usuário.
     * @param name Nome do usuário.
     * @returns Promise com o usuário encontrado ou undefined.
     */
    public async findByIdAndName(id: string, name: string): Promise<User> {
        const users = await this.readUsers();
        return users.find(u => u.id === id && u.getName() === name);
    }
}