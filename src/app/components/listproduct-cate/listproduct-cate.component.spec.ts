import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductCateComponent } from './listproduct-cate.component';

describe('ListproductCateComponent', () => {
  let component: ListproductCateComponent;
  let fixture: ComponentFixture<ListproductCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListproductCateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListproductCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
