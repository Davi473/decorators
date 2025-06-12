import Name from "../vo/Name";
import Currency from "../vo/Currency";
import Email from "../vo/Email";

export default class User {
    private name: string;
    private email: string;
    private currency: string;
    private hashAndSaltArray: string[];

    constructor(
        readonly id: string,
        @Name()
        name: string,
        @Email()
        email: string,
        @Currency()
        currency: string,
        hashAndSalt: string
    ) {
        this.name = name;
        this.email = email;
        this.currency = currency;
        this.hashAndSaltArray = hashAndSalt.split(".");
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
        const salt = this.hashAndSaltArray[0]
        const hash = this.hashAndSaltArray[1]
        const newHash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
        return newHash === hash;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCurrency(): string {
        return this.currency
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }
}