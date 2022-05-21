import { Injectable } from '@angular/core';
import { laptopDTO } from '../models/laptopDTO';
import { orderDTO } from '../models/orderDTO';

interface orderResponse{
  okResponse:boolean,
  order:orderDTO
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
fakeOrder:orderDTO[];
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
  getTestingOrders():orderDTO[]{
      return this.fakeOrder
  }

// create testing orders (Just for testing), modifying the okResponse (boolean) you can test different results based on server response
  createTestingOrderSuccess(order:orderDTO):orderResponse{

    let okResponse: boolean;

    okResponse = true;

    if(okResponse){
      order.orderNumber= this.fakeOrder.length;
      order.orderAmount=this.calculateAmount(order);
      this.fakeOrder.push(order)
    }

    let orderResponse:orderResponse= {okResponse:okResponse,order:order}
    return orderResponse
  }
}
