import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydangkynhuongquyenComponent } from './quanlydangkynhuongquyen.component';

describe('QuanlydangkynhuongquyenComponent', () => {
  let component: QuanlydangkynhuongquyenComponent;
  let fixture: ComponentFixture<QuanlydangkynhuongquyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlydangkynhuongquyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlydangkynhuongquyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
