import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillUserComponent } from './bill-user.component';

describe('BillUserComponent', () => {
  let component: BillUserComponent;
  let fixture: ComponentFixture<BillUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
