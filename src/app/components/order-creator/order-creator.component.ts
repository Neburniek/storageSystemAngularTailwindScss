import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { laptopDTO } from 'src/app/models/laptopDTO';
import { orderDTO } from 'src/app/models/orderDTO';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-creator',
  templateUrl: './order-creator.component.html',
  styleUrls: ['./order-creator.component.scss']
})
export class OrderCreatorComponent implements OnInit, OnChanges {

  // edition mode
  editMode:boolean;

  // notification message
  submissionSuccesful:boolean |null;
  errorMessage: string | null;

  // form
  newOrder:orderDTO;
  deliverAddress:FormControl;
  billingAddress:FormControl;
  items: laptopDTO[];
  companyName:FormControl;
  createOrderForm:FormGroup;
  isValidForm:boolean | null;

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() orderDetails: orderDTO | null;

  constructor(
    private formBuilder: FormBuilder,
    private orderService:OrdersService
  ) { 

    this.orderDetails=null;
    this.editMode=false;
    this.newOrder= new orderDTO("","",[],"");
    this.items= []
    this.isValidForm=null;
    this.submissionSuccesful=null;
    this.errorMessage= null;
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

  ngOnChanges(){
    // set value to form during edition mode
    if(this.orderDetails){
      this.editMode=true;
     this.deliverAddress.setValue(this.orderDetails.deliverAddress)
     this.billingAddress.setValue(this.orderDetails.billingAddress)
     this.companyName.setValue(this.orderDetails.companyName)
 
   
     }else{
       this.editMode=false;
       this.createOrderForm.reset()
     }
  }


  createOrder(){
    if(this.editMode){
  this.editOrder()
    }else{
      this.createNewOrder()
    }
  }

  // made async function in order to facilitate the transition to a database, test mode does not request async

  async editOrder(){
    
  this.checkFormValidity()
    try{

      if(this.orderDetails && confirm("Are you sure do you want to modify order " + this.orderDetails.orderNumber + "?")){
        let orderResponse= await this.orderService.editOrder(this.newOrder, this.orderDetails);

       this.alertResponseHandling(orderResponse)
      }else{
        alert("Something went wrong")
      }

      this.reset(false)


     
    }catch(error:any){
      console.log(error)
    }

  }

  checkFormValidity(){
    this.isValidForm=false;
    if(this.createOrderForm.invalid ){
     return
    }

    this.isValidForm=true;

    this.newOrder= this.createOrderForm.value
  }

  alertResponseHandling(orderResponse:any){
    if(orderResponse.okResponse){
      alert("Order Succesfully modified")
    }else{
      alert(orderResponse.errorMessage ||  "something went wrong")
    }
  }


  // made async function in order to facilitate the transition to a database, test mode does not request async
async createNewOrder(){


   this.checkFormValidity()
    this.newOrder.items= [ new laptopDTO("Lenovo Yoga Slim 7", 700, 12, "Nvidia", "i3", 519, 1900, 2 ), new laptopDTO("Lenovo IdeaPad 5", 559, 12, "AMD", "i2", 519, 1900, 2 ), 
   

    new laptopDTO("Lenovo Thinkbook 15", 559, 12, "AMD", "i2", 519, 1900, 2 )]

    try{
      let orderResponse= await this.orderService.createTestingOrderSuccess(this.newOrder);
      this.responseHandling(orderResponse)
    }catch(error:any){
      console.log(error)
    }
   
    
  }



  responseHandling(orderResponse:any){
    if (orderResponse.okResponse && orderResponse.order){
      this.submissionSuccesful=true;
      this.newOrder=orderResponse.order;
      // this.createOrderForm.reset()
    }else{
      this.submissionSuccesful=false;
     
      this.errorMessage=orderResponse.errorMessage || "Something went Wrong"
    }
  }


//  reset form and if requested, hide the form
  reset(event:any){
  if(event){
 
      this.submissionSuccesful=null
    }else{
      this.closeMenu.emit(true)
    }

    this.createOrderForm.reset()
  }

}
