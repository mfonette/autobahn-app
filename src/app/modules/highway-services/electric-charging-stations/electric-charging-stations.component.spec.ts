import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricChargingStationsComponent } from './electric-charging-stations.component';

describe('ElectricChargingStationsComponent', () => {
  let component: ElectricChargingStationsComponent;
  let fixture: ComponentFixture<ElectricChargingStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricChargingStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricChargingStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
