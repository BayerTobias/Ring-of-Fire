import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DareCardComponent } from './dare-card.component';

describe('DareCardComponent', () => {
  let component: DareCardComponent;
  let fixture: ComponentFixture<DareCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DareCardComponent]
    });
    fixture = TestBed.createComponent(DareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
