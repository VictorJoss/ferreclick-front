import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProductDropdownComponent } from './general-product-dropdown.component';

describe('GeneralProductDropdownComponent', () => {
  let component: GeneralProductDropdownComponent;
  let fixture: ComponentFixture<GeneralProductDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralProductDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralProductDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
