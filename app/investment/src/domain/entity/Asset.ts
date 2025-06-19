export default class Asset {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly currency: string,
        readonly category: string,
        readonly average: number,
        readonly quantity: number,
    ) {}

    public static create(
        name: string,
        currency: string,
        category: string,
        average: number,
        quantity: number,
    ) {
        return new Asset(
            crypto.randomUUID(),
            name,
            currency,
            category,
            average,
            quantity,
        );
    }   

    public profitabilityInPercentage(currentValue: number): number {
        return ((currentValue - this.average) / this.average) * 100;
    }
}