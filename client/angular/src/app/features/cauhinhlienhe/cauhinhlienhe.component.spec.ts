import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauhinhlienheComponent } from './cauhinhlienhe.component';

describe('CauhinhlienheComponent', () => {
  let component: CauhinhlienheComponent;
  let fixture: ComponentFixture<CauhinhlienheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhlienheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauhinhlienheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
