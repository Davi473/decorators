import WalletRepository from "../../application/repository/WalletRepository";
import fs from "fs/promises";
import path from "path";
import Wallet from "../../domain/entity/Wallet";

/**
 * Implementação de WalletRepository que utiliza um arquivo JSON para persistência dos dados das wallets.
 */
export class WalletRepositoryJson implements WalletRepository {
    /**
     * Caminho absoluto para o arquivo JSON onde as wallets são armazenadas.
     */
    public DATA_PATH = path.resolve(__dirname, "../../../data/wallets.json");

    /**
     * Lê todas as wallets do arquivo JSON.
     * @returns Promise com a lista de wallets.
     */
    private async readWallets(): Promise<any[]> {
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
     * Escreve a lista de wallets no arquivo JSON.
     * @param wallets Lista de wallets a ser salva.
     */
    private async writeWallets(wallet: Wallet): Promise<void> {
        const wallets = await this.readWallets();
        wallets.push({id: wallet.id, userId: wallet.userId, name: wallet.getName(), currency: wallet.getCurrency(), createdAt: wallet.createdAt});
        await fs.writeFile(this.DATA_PATH, JSON.stringify(wallets, null, 2), "utf-8");
    }

    /**
     * Salva uma wallet. Se já existir, atualiza; senão, adiciona.
     * @param wallet Wallet a ser salva.
     */
    public async save(wallet: Wallet): Promise<void> {
        await this.writeWallets(wallet);
    }

    /**
     * Busca uma wallet pelo id do usuário.
     * @param idUser ID do usuário.
     * @returns Promise com a wallet encontrada ou undefined.
     */
    public async findByIdUser(idUser: string): Promise<Wallet[] | undefined> {
        const wallets = await this.readWallets();
        const wallet = wallets.filter(w => w.userId === idUser);
        return wallet ? wallet.map(w => w = new Wallet(w.id, w.userId, w.name, w.currency, w.createdAt)) : undefined;
    }

    /**
     * Busca uma wallet pelo id e id do usuário.
     * @param id ID da wallet.
     * @param idUser ID do usuário.
     * @returns Promise com a wallet encontrada ou undefined.
     */
    public async findByIdAndIdUser(id: string, idUser: string): Promise<Wallet | undefined> {
        const wallets = await this.readWallets();
        const wallet = wallets.find(w => w.id === id && w.userId === idUser);
        return wallet ? new Wallet(wallet.id, wallet.userId, wallet.name, wallet.currency, wallet.createdAt) : undefined;
    }
}