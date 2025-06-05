export default function Name() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                if (value.split(" ").length < 2) throw new Error("Erro")
                this[privateKey] = value;
            }
        });
    }
}