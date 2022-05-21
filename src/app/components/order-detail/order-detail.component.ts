import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { laptopDTO } from 'src/app/models/laptopDTO';
import { orderDTO } from 'src/app/models/orderDTO';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
editionMode:boolean;
  @Input() orderDetails: orderDTO;
  @Output() closeMe:EventEmitter<boolean>= new EventEmitter()
  constructor(
    private orderService:OrdersService
  ) {

    this.orderDetails= new orderDTO("","",[new laptopDTO("",0,0,"","",0,0,0)],"");
    this.editionMode=false;
   }

  ngOnInit(): void {
  }

  editOrder(){
this.editionMode=!this.editionMode;
  }
  async deleteOrder(){
   if(confirm("Are you sure you want to delete the order number " + this.orderDetails.orderNumber )){
     try{
      let response = await this.orderService.deleteTestingOrder(this.orderDetails)
      if(response){
        alert("The order number " + this.orderDetails.orderNumber + " has been succesfully deleted");
      }else{
        alert("Unable to delete " + this.orderDetails.orderNumber)

      }
      this.closeWindow()
     }catch(error:any){
       console.log(error)
     }

   }
  }

  closeWindow(){
    this.closeMe.emit(true)

  }

}
