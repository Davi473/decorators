export default function Email() {
    return (target: any, key: string) => {
        const privateKey = Symbol(key);
        Object.defineProperty(target, key, {
            get() {
                return this[privateKey];
            },
            set(value: string) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!(regex.test(value))) throw new Error("Invalid email");
                this[privateKey] = value;
            }
        });
    }
}