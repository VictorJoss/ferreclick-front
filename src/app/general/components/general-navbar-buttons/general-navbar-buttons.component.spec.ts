import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNavbarButtonsComponent } from './general-navbar-buttons.component';

describe('GeneralNavbarButtonsComponent', () => {
  let component: GeneralNavbarButtonsComponent;
  let fixture: ComponentFixture<GeneralNavbarButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralNavbarButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralNavbarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
