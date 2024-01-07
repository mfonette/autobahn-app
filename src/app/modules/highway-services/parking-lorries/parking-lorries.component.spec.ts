import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLorriesComponent } from './parking-lorries.component';

describe('ParkingLorriesComponent', () => {
  let component: ParkingLorriesComponent;
  let fixture: ComponentFixture<ParkingLorriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLorriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingLorriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
