import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsectionComponent } from './productsection.component';

describe('ProductsectionComponent', () => {
  let component: ProductsectionComponent;
  let fixture: ComponentFixture<ProductsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
