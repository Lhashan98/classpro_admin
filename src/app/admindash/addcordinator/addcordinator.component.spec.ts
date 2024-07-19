import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcordinatorComponent } from './addcordinator.component';

describe('AddcordinatorComponent', () => {
  let component: AddcordinatorComponent;
  let fixture: ComponentFixture<AddcordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcordinatorComponent]
    });
    fixture = TestBed.createComponent(AddcordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
