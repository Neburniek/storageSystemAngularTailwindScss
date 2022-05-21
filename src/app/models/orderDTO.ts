import { laptopDTO } from "./laptopDTO";

export class orderDTO{
    _id?:string;
    orderNumber?:number;
    deliverAddress:string;
    billingAddress:string;
    orderAmount?:number;
       items:laptopDTO[];
    companyName:string;
    constructor(deliverAddress:string, billingAddress:string, items:laptopDTO[], companyName:string){
        
        this.deliverAddress= deliverAddress,
        this.billingAddress=billingAddress,
        this.items=items,
        this.companyName=companyName
    }

}