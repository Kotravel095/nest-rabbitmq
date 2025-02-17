export class orderDto {
    constructor (
        public email: string,
        public productname: string,
        public quantity: number,
    ) {}
}