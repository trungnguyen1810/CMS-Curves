import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamnangdinhduongComponent } from './camnangdinhduong.component';

describe('CamnangdinhduongComponent', () => {
  let component: CamnangdinhduongComponent;
  let fixture: ComponentFixture<CamnangdinhduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamnangdinhduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamnangdinhduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
