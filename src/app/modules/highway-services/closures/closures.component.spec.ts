import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosuresComponent } from './closures.component';

describe('ClosuresComponent', () => {
  let component: ClosuresComponent;
  let fixture: ComponentFixture<ClosuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
