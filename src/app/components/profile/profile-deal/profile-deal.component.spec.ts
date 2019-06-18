import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealComponent } from './profile-deal.component';

describe('ProfileDealComponent', () => {
  let component: ProfileDealComponent;
  let fixture: ComponentFixture<ProfileDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
