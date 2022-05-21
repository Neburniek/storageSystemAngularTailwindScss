import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatorComponent } from './order-creator.component';

describe('OrderCreatorComponent', () => {
  let component: OrderCreatorComponent;
  let fixture: ComponentFixture<OrderCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
