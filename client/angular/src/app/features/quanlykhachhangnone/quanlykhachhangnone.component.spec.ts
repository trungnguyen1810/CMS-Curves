import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlykhachhangnoneComponent } from './quanlykhachhangnone.component';

describe('QuanlykhachhangnoneComponent', () => {
  let component: QuanlykhachhangnoneComponent;
  let fixture: ComponentFixture<QuanlykhachhangnoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlykhachhangnoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlykhachhangnoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
