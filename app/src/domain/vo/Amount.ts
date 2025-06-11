export function Amount() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: number) {
                if (value < 15) throw new Error("Erro")
                this[privateKey] = value;
            }
        });
    }
}