import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorycartComponent } from './historycart.component';

describe('HistorycartComponent', () => {
  let component: HistorycartComponent;
  let fixture: ComponentFixture<HistorycartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorycartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorycartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
