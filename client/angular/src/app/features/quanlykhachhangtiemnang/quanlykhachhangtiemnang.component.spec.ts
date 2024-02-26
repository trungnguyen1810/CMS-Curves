import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlykhachhangtiemnangComponent } from './quanlykhachhangtiemnang.component';

describe('QuanlynguonkhachhangComponent', () => {
  let component: QuanlykhachhangtiemnangComponent;
  let fixture: ComponentFixture<QuanlykhachhangtiemnangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlykhachhangtiemnangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlykhachhangtiemnangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
