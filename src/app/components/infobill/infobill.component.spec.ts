import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobillComponent } from './infobill.component';

describe('InfobillComponent', () => {
  let component: InfobillComponent;
  let fixture: ComponentFixture<InfobillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfobillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfobillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
