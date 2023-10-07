import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEqComponent } from './modal-eq.component';

describe('ModalEqComponent', () => {
  let component: ModalEqComponent;
  let fixture: ComponentFixture<ModalEqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEqComponent]
    });
    fixture = TestBed.createComponent(ModalEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
