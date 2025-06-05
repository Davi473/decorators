export function Description() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                if (value.length < 15) throw new Error("Erro")
                this[privateKey] = value;
            }
        });
    }
}