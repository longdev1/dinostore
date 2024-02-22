import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegoproductComponent } from './legoproduct.component';

describe('LegoproductComponent', () => {
  let component: LegoproductComponent;
  let fixture: ComponentFixture<LegoproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegoproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegoproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
