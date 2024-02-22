import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountproductComponent } from './discountproduct.component';

describe('DiscountproductComponent', () => {
  let component: DiscountproductComponent;
  let fixture: ComponentFixture<DiscountproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
