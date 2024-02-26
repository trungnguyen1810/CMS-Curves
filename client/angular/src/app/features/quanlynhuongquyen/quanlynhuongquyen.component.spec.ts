import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlynhuongquyenComponent } from './quanlynhuongquyen.component';

describe('QuanlynhuongquyenComponent', () => {
  let component: QuanlynhuongquyenComponent;
  let fixture: ComponentFixture<QuanlynhuongquyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlynhuongquyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlynhuongquyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
