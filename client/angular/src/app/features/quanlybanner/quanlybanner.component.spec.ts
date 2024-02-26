import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlybannerComponent } from './quanlybanner.component';

describe('QuanlybannerComponent', () => {
  let component: QuanlybannerComponent;
  let fixture: ComponentFixture<QuanlybannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlybannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlybannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
