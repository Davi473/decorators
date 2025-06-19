export function Name(length: number) {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                if (value.split(" ").length < length) throw new Error("Erro")
                this[privateKey] = value;
            }
        });
    }
}