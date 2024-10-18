import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPasswordComponent } from './change-password.component';

describe('ChangPasswordComponent', () => {
  let component: ChangPasswordComponent;
  let fixture: ComponentFixture<ChangPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
