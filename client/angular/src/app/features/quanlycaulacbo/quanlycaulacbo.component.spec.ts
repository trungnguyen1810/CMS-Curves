import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlycaulacboComponent } from './quanlycaulacbo.component';

describe('QuanlycaulacboComponent', () => {
  let component: QuanlycaulacboComponent;
  let fixture: ComponentFixture<QuanlycaulacboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlycaulacboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlycaulacboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
