import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyhethongComponent } from './quanlyhethong.component';

describe('QuanlyhethongComponent', () => {
  let component: QuanlyhethongComponent;
  let fixture: ComponentFixture<QuanlyhethongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyhethongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyhethongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
