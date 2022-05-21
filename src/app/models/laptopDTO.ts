export class laptopDTO{
    _id?:string;
    name:string;
    priceEUR:number;
    ramGB:number;
    graphicCard:string;
    storageGB:number;
    screenWidth:number;
    weightKg:number;
    processor:string;

    constructor(name:string,priceEUR:number,ramGB:number, 
        graphicCard:string,procesor:string, storageGB:number,screenWidth:number, 
        weightKg:number )
        {
            this.name=name,
            this.priceEUR=priceEUR,
            this.ramGB=ramGB,
            this.graphicCard=graphicCard,
            this.processor=procesor,
            this.storageGB=storageGB,
            this.screenWidth=screenWidth,
            this.weightKg=weightKg

    }
}