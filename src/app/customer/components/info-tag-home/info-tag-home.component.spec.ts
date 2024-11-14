import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTagHomeComponent } from './info-tag-home.component';

describe('InfoTagHomeComponent', () => {
  let component: InfoTagHomeComponent;
  let fixture: ComponentFixture<InfoTagHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTagHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTagHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
