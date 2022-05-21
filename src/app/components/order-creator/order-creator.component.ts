import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { laptopDTO } from 'src/app/models/laptopDTO';
import { orderDTO } from 'src/app/models/orderDTO';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-creator',
  templateUrl: './order-creator.component.html',
  styleUrls: ['./order-creator.component.scss']
})
export class OrderCreatorComponent implements OnInit {

  submissionSuccesful:boolean |null;
  newOrder:orderDTO;
  deliverAddress:FormControl;
  billingAddress:FormControl;
  // orderAmount:FormControl;
  items: laptopDTO[];
  companyName:FormControl;

  createOrderForm:FormGroup;
  isValidForm:boolean | null;
  constructor(
    private formBuilder: FormBuilder,
    private orderService:OrdersService
  ) { 

    this.newOrder= new orderDTO("","",[],"");
    this.items= []
    this.isValidForm=null;
    this.submissionSuccesful=null;
    this.deliverAddress = new FormControl(this.newOrder.deliverAddress,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    this.billingAddress = new FormControl(this.newOrder.deliverAddress,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    this.companyName = new FormControl(this.newOrder.deliverAddress,[Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
  
    this.createOrderForm = this.formBuilder.group({
      deliverAddress:this.deliverAddress,
      billingAddress:this.billingAddress,
      companyName:this.companyName
    })
  
  
  }

  ngOnInit(): void {
  }

  async createOrder(){


    this.isValidForm=false;
    if(this.createOrderForm.invalid){
     return
    }

    this.isValidForm=true;
    this.newOrder= this.createOrderForm.value;
    this.newOrder.items= [ new laptopDTO("Lenovo Yoga Slim 7", 700, 12, "Nvidia", "i3", 519, 1900, 2 )]
    let orderResponse= this.orderService.createTestingOrderSuccess(this.newOrder);
    if (orderResponse.okResponse){
      this.submissionSuccesful=true;
      this.newOrder=orderResponse.order;
      // this.createOrderForm.reset()
    }else{
      this.submissionSuccesful=false;
    }
    
  }

}