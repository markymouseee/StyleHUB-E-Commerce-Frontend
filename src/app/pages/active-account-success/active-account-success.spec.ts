import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountSuccess } from './active-account-success';

describe('ActiveAccountSuccess', () => {
  let component: ActiveAccountSuccess;
  let fixture: ComponentFixture<ActiveAccountSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAccountSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
