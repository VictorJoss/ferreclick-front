import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProductSectionComponent } from './general-product-section.component';

describe('GeneralProductSectionComponent', () => {
  let component: GeneralProductSectionComponent;
  let fixture: ComponentFixture<GeneralProductSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralProductSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralProductSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
