export function Email() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]\.com$/;
                if (!pattern.test(email)) throw new Error("Não é email válido"); 
                this[privateKey] = value;
            }
        });
    }
}