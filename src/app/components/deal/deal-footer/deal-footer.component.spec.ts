import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealFooterComponent } from './deal-footer.component';

describe('DealFooterComponent', () => {
  let component: DealFooterComponent;
  let fixture: ComponentFixture<DealFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
