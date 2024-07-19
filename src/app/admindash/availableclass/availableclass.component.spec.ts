import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableclassComponent } from './availableclass.component';

describe('AvailableclassComponent', () => {
  let component: AvailableclassComponent;
  let fixture: ComponentFixture<AvailableclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableclassComponent]
    });
    fixture = TestBed.createComponent(AvailableclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
