import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { HigwayService } from './shared/services/higway.service';
import { AutobahnService } from './shared/services/autobahn.service';

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
  @Output() highwaySelected = new EventEmitter<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private autobahnService:AutobahnService,
    private router: Router,
    private highwayService: HigwayService
  ) { 
    this.router.navigate([`/highway-info/roadworks`]);
  }

  ngOnInit(): void {
    this.getAllHighWays();
    this.selectedHighway = 'A1';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Only continue if it's a navigation end event
    ).subscribe((event: any) => {
      console.log(event.url)
      // Now you can check the URL or other conditions:
      if (event.url.includes('/highway-info')) {
        this.selectedHighway = 'A1';
        this.highwayService.resetToDefaultHighway();
      }
    });
  }

  toggleMenu() {
    this.hamClick = !this.hamClick;
    this.isMenuOpen = this.hamClick;
  }

  getAllHighWays() {
    this.subscription.add(this.autobahnService.fetchHighways().subscribe({
      next:(data) => {
        console.log(data.roads);
        this.listOfHighways = data.roads;
      }
  }));
  }

  getSelectedHighway() {
    this.subscription.add(this.highwayService.selectedHighway$.subscribe(highway => {
      if (highway) {
        this.selectedHighway = highway;
        console.log('from app',highway)
      }
    }));
  }

  onHighwaySelect(highway: string) {
    console.log('Highway selected:', highway);
    this.highwayService.setSelectedHighway(highway);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();  // Unsubscribe when the component is destroyed
    }
}
