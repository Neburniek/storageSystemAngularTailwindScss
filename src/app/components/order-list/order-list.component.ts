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

  headers=["nº", "Delivery Address", "Billing Address",
   "Amount", "Items", "Company Name"]
  
  orderList:orderDTO[]=[]



  constructor(
    private orderService:OrdersService
  ) {
    this.showCreate=false;

  
   }


  ngOnInit(): void {
   this.orderList=this.orderService.getTestingOrders()
  }

  

  showCreateToggle(){
   this.showCreate=!this.showCreate;
  }
}
