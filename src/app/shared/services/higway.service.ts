import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HigwayService {

  constructor() { }

  private selectedHighway = new BehaviorSubject<string>(localStorage.getItem('selectedHighway') || '');
  private selectedService = new BehaviorSubject<string>(localStorage.getItem('selectedService') || '');

  selectedHighway$ = this.selectedHighway.asObservable();
  selectedService$ = this.selectedService.asObservable();

  setSelectedHighway(highway: string) {
    localStorage.setItem('selectedHighway', highway);
    this.selectedHighway.next(highway);
    console.log('from service', highway)
  }

    // Function to change the serviceType
    changeServiceType(serviceType: string) {
      localStorage.setItem('selectedService', serviceType);
      this.selectedService.next(serviceType);
    }

    // Call this method to reset to default highway 'A1'
    resetToDefaultHighway() {
      this.selectedHighway.next('A1');
    }

}
