import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorsComponent } from './cordinators.component';

describe('CordinatorsComponent', () => {
  let component: CordinatorsComponent;
  let fixture: ComponentFixture<CordinatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordinatorsComponent]
    });
    fixture = TestBed.createComponent(CordinatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
