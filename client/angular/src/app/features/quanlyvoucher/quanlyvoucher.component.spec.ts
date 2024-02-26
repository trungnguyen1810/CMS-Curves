import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyvoucherComponent } from './quanlyvoucher.component';

describe('QuanlyvoucherComponent', () => {
  let component: QuanlyvoucherComponent;
  let fixture: ComponentFixture<QuanlyvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
