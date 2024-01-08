import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HigwayService {

  constructor() { }

  private selectedHighway = new BehaviorSubject<string>('A1');
  private selectedService = new BehaviorSubject<string>(localStorage.getItem('selectedService') || '');
  private isBackButtonClicked = new BehaviorSubject<boolean>(false);

  selectedHighway$ = this.selectedHighway.asObservable();
  selectedService$ = this.selectedService.asObservable();

  setSelectedHighway(highway: string) {
    this.selectedHighway.next(highway);
    console.log(`HighwayService: Setting highway to ${highway} at ${new Date().toISOString()}`);
  }

    // Function to change the serviceType
    changeServiceType(serviceType: string) {
      localStorage.setItem('selectedService', serviceType);
      this.selectedService.next(serviceType);
    }

    // Call this method to reset to default highway 'A1'
    resetToDefaultHighway(defaultHighway: string = 'A1') {
      this.selectedHighway.next(defaultHighway);
      console.log(`resetHighway: Resetting highway to A1 at ${new Date().toISOString()}`);
    }

    getCurrentHighway(): string {
      return this.selectedHighway.value;
    }

    setBackButtonClicked(value: boolean): void {
      this.isBackButtonClicked.next(value);
    }
    
    getBackButtonClicked(): Observable<boolean> {
      return this.isBackButtonClicked.asObservable();
    }
    

}
