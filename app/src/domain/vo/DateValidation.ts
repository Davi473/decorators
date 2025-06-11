export function DateValidation() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                const date = new Date(`${value}T03:00:00`);
                if (!date) throw new Error("Data Invalidate")
                this[privateKey] = value;
            }
        });
    }
}