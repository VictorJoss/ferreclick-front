import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnaliticsComponent } from './admin-analitics.component';

describe('AdminAnaliticsComponent', () => {
  let component: AdminAnaliticsComponent;
  let fixture: ComponentFixture<AdminAnaliticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnaliticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnaliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
