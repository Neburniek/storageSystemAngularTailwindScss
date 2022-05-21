import { Injectable } from '@angular/core';
import { laptopDTO } from '../models/laptopDTO';
import { orderDTO } from '../models/orderDTO';

interface orderTestResponse{
  okResponse:boolean,
  order?:orderDTO
  errorMessage?:string
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
fakeOrder:orderDTO[];



// Change in order to test error and sucess messages
testOrderNumber:number =2;
okTestResponse:boolean=true;
testErrorMessage:string="Test Error Message";

  constructor() { 

    
   this.fakeOrder=[
    
    new orderDTO("fake address 123","fake address 123",
  [ new laptopDTO("Lenovo Yoga Slim 7", 700, 12, "Nvidia", "i3", 519, 1900, 2 )], "Stupas SRO"),


  new orderDTO("fake address 456","fake address 456",
   [ new laptopDTO("Lenovo Yoga Slim 7", 700, 12, "Nvidia", "i3", 519, 1900, 2 ),
  
   new laptopDTO("Lenovo IdeaPad 5", 559, 12, "AMD", "i2", 519, 1900, 2 ),
  
  ], "Imaginary SRO"),

  
  new orderDTO("fake address 789","fake address 789",
   [ new laptopDTO("Lenovo Yoga Slim 7", 700, 12, "Nvidia", "i3", 519, 1900, 2 ),
  
   new laptopDTO("Lenovo IdeaPad 5", 559, 12, "AMD", "i2", 519, 1900, 2 ), 
   
   new laptopDTO("Lenovo Thinkbook 15", 559, 12, "AMD", "i2", 519, 1900, 2 ),
  
  ], "Tango SRO")]

  this.fakeOrder.forEach(order=>{
   order.orderNumber = this.fakeOrder.indexOf(order)
    order.orderAmount=this.calculateAmount(order);

  })
  
  }


  // It calculates the total amount of the order.
calculateAmount(order:orderDTO){
  let orderAmount=0;
  for (let i = 0; i < order.items.length; i++) {
    orderAmount += order.items[i].priceEUR;
}

return orderAmount;
}

// get testing orders (Just for testing)
 async  getTestingOrders():Promise<orderDTO[]>{
      return  this.fakeOrder
  }

// create testing orders (Just for testing), modifying the okResponse (boolean) you can test different results based on server response
  async createTestingOrderSuccess(order:orderDTO):Promise<orderTestResponse>{



    if(this.okTestResponse){
      this.testOrderNumber++
      order.orderNumber= this.testOrderNumber;

      order.orderAmount=this.calculateAmount(order);
      this.fakeOrder.push(order)
      return  {okResponse:this.okTestResponse,order:order}
    }else{
      return   {okResponse:this.okTestResponse,errorMessage:this.testErrorMessage}

    }

   
  }


  async deleteTestingOrder(order:orderDTO): Promise<boolean>{
    this.fakeOrder.splice(this.fakeOrder.indexOf(order),1);
    return this.okTestResponse;
  }
}
