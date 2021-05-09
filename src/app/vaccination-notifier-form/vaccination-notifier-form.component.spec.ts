import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationNotifierFormComponent } from './vaccination-notifier-form.component';

describe('VaccinationNotifierFormComponent', () => {
  let component: VaccinationNotifierFormComponent;
  let fixture: ComponentFixture<VaccinationNotifierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationNotifierFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationNotifierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
