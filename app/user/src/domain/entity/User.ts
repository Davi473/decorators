import { randomBytes, pbkdf2Sync } from 'crypto';

export default class User {
    private userName: string;
    private userEmail: string;
    private userCurrency: string;
    private hashAndSaltArray: string;

    constructor(
        readonly id: string,
        userName: string,
        userEmail: string,
        userCurrency: string,
        hashAndSalt: string
    ) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userCurrency = userCurrency;
        this.hashAndSaltArray = hashAndSalt;
    }

    public static create(
        name: string, email: string, password: string
    ) {
        const id = crypto.randomUUID();
        const salt = randomBytes(16).toString('hex'); 
        const hash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
        return new User(id, name, email, "USD", `${salt}.${hash}`);
    }

    public verifyPassword(password: string): boolean {
        const parts = this.hashAndSaltArray.split('.');
        const salt = parts[0];
        const hash = parts[1];
        const newHash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
        return newHash === hash;
    }

    public getName(): string {
        return this.userName;
    }

    public getHash(): string {
        return this.hashAndSaltArray;
    }

    public getEmail(): string {
        return this.userEmail;
    }

    public getCurrency(): string {
        return this.userCurrency;
    }

    public setCurrency(currency: string): void {
        this.userCurrency = currency;
    }
}