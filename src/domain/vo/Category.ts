export function Category() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                if (value === "expense" || value === "income") 
                    throw new Error("Erro categoria so pode ser 'expense' e 'income'");
                this[privateKey] = value;
            }
        });
    }
}