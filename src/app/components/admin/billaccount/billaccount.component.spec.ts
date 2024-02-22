import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillaccountComponent } from './billaccount.component';

describe('BillaccountComponent', () => {
  let component: BillaccountComponent;
  let fixture: ComponentFixture<BillaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillaccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
