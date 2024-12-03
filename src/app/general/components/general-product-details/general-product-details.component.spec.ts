import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProductDetailsComponent } from './general-product-details.component';

describe('GeneralProductDetailsComponent', () => {
  let component: GeneralProductDetailsComponent;
  let fixture: ComponentFixture<GeneralProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralProductDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
