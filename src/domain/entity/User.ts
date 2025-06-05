import Name from "../vo/Name";
import Email from "../vo/Email";
import { randomBytes, pbkdf2Sync } from "crypto";

export default class User {
    @Name()
    private name: string;
    @Email()
    private email: string;
    private hashAndSaltArray: string[];

    constructor(
        readonly id: string,
        name: string,
        email: string,
        hashAndSalt: string
    ) {
        this.name = name;
        this.email = email;
        this.hashAndSaltArray = hashAndSalt.split(".");
    }

    public static create(
        name: string, email: string, password: string
    ) {
        const id = crypto.randomUUID();
        const salt = randomBytes(16).toString('hex'); 
        const hash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
        return new User(id, name, email, `${salt}.${hash}`);
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
}