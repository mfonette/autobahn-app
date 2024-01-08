import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { HigwayService } from './shared/services/higway.service';
import { AutobahnService } from './shared/services/autobahn.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autobahn-application';
  hamClick: any;
  isMenuOpen!: boolean;
  navLinks: any;
  listOfHighways: string[] | undefined = [];
  selectedHighway: string = ''
  isMapView: boolean = false; 
  @Output() highwaySelected = new EventEmitter<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private autobahnService:AutobahnService,
    private router: Router,
    private highwayService: HigwayService,
    private location: Location
  ) { 
    this.router.navigate([`/highway-info/roadworks`]);
  }

  ngOnInit(): void {
    this.getAllHighWays();
    this.getSelectedHighway();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMapView = event.url.includes('/view-map/map');
      }
    });

  }

  toggleMenu() {
    this.hamClick = !this.hamClick;
    this.isMenuOpen = this.hamClick;
  }

  // get list of highways
  getAllHighWays() {
    this.subscription.add(this.autobahnService.fetchHighways().subscribe({
      next:(data) => {
        console.log(data.roads);
        this.listOfHighways = data.roads;
      }
  }));
  }

// get selected highway
  getSelectedHighway() {
    this.subscription.add(this.highwayService.selectedHighway$.subscribe(highway => {
      if (highway) {
        this.selectedHighway = highway;
      }
    }));
  }

  // set the new selected highway
  onHighwaySelect(highway: string) {
    this.highwayService.setSelectedHighway(highway);
    }

  
    ngOnDestroy() {
      this.subscription.unsubscribe();  // Unsubscribe when the component is destroyed
    }

        // Navigate back to the previous state
    goBack() {
      this.location.back();
    }
}
