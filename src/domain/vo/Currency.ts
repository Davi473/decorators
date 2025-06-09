enum enumCurrency {
    EUR = "EUR",
    USD = "USD",
    BRL = "BRL"
}

export function Currency() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                if (!(value in enumCurrency)) throw new Error("Não existe esse tipo de moeda"); 
                this[privateKey] = enumCurrency[value.toUpperCase() as keyof typeof enumCurrency];
            }
        });
    }
}