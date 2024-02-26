import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlynguonkhachhangComponent } from './quanlynguonkhachhang.component';

describe('QuanlynguonkhachhangComponent', () => {
  let component: QuanlynguonkhachhangComponent;
  let fixture: ComponentFixture<QuanlynguonkhachhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlynguonkhachhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlynguonkhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
