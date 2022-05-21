import { Component, OnInit } from '@angular/core';
import { laptopDTO } from 'src/app/models/laptopDTO';
import { orderDTO } from 'src/app/models/orderDTO';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  showCreate:boolean;
  showDetails:boolean;
  orderDetails:orderDTO;

  headers=["nº", "Delivery Address", "Billing Address",
   "Amount", "Items", "Company Name"]
  
  orderList:orderDTO[]=[]



  constructor(
    private orderService:OrdersService
  ) {
    this.showCreate=false;
    this.orderDetails= new orderDTO("","",[new laptopDTO("",0,0,"","",0,0,0)],"");
    this.showDetails=false;
   }


  ngOnInit(): void {
   this.loadOrders()
  }

  
 loadOrders(){
  try{
    this.orderList= this.orderService.getTestingOrders()
  }catch(error:any){
    console.log(error)
  }
  
}
  showCreateToggle(){
   this.showCreate=!this.showCreate;
  }

  showOrderDetail(order:orderDTO){
    this.orderDetails=order;
    this.showDetails=true;
  }
  showDetailsToggle()
{  this.showDetails=!this.showDetails;}
}
