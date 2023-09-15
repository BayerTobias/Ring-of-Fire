import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDialogCardComponent } from './warning-dialog-card.component';

describe('WarningDialogCardComponent', () => {
  let component: WarningDialogCardComponent;
  let fixture: ComponentFixture<WarningDialogCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningDialogCardComponent]
    });
    fixture = TestBed.createComponent(WarningDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
