import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavbarButtonsComponent } from './admin-navbar-buttons.component';

describe('AdminNavbarButtonsComponent', () => {
  let component: AdminNavbarButtonsComponent;
  let fixture: ComponentFixture<AdminNavbarButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavbarButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavbarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
