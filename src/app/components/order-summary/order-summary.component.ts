import { Component, Input, OnInit } from '@angular/core';
import { laptopDTO } from 'src/app/models/laptopDTO';
import { orderDTO } from 'src/app/models/orderDTO';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() order:orderDTO;

  constructor() {
    this.order=new orderDTO("","",[new laptopDTO("",0,0,"","",0,0,0)],"")
   }

  ngOnInit(): void {
  }

}
