import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeltoysComponent } from './modeltoys.component';

describe('ModeltoysComponent', () => {
  let component: ModeltoysComponent;
  let fixture: ComponentFixture<ModeltoysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeltoysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeltoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
