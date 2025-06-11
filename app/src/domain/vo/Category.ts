export function Category() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                const valueLower = String(value).toLowerCase();
                if (valueLower === "expense" || valueLower === "income") {
                    this[privateKey] = value;
                    return;
                }
                throw new Error("Erro categoria so pode ser 'expense' e 'income'");
            }
        });
    }
}