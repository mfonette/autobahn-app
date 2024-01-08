import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ColumnDefinition } from 'src/app/shared/column-definition';
import { AutobahnService } from 'src/app/shared/services/autobahn.service';
import { HigwayService } from 'src/app/shared/services/higway.service';

@Component({
  selector: 'app-roadworks',
  templateUrl: './roadworks.component.html',
  styleUrls: ['./roadworks.component.css']
})
export class RoadworksComponent implements OnInit {
  highwayId!: any;
  isLoading = true;
  updatedState!: any;
  roadworksData!: any// Populate this with actual data
  private subscription: Subscription = new Subscription();
  columns: ColumnDefinition[] = [
    { header: 'Highway', dataKey: 'title' },
    { header: 'Title', dataKey: 'subTitle' }
  ];
  
  constructor(  
    private router: Router,
    private autobahnService: AutobahnService,
    private changeDetectorRefs: ChangeDetectorRef,
    private highwayService: HigwayService,
    private activatedRoute: ActivatedRoute
    ) { 
      // this.fetchInitialData();
    }

    ngOnInit() {
      const serviceType = this.activatedRoute.snapshot.routeConfig?.path;
      if(serviceType) {
        this.highwayService.changeServiceType(serviceType);
      }
      this.highwayService.selectedHighway$.subscribe(highway => {
        if (highway) {
          this.fetchData(highway);
        }
      });
    }

    fetchInitialData() {
      this.highwayService.selectedHighway$.pipe(take(1)).subscribe(highway => {
        this.fetchData(highway);
      });
    }

    fetchData(highway: string) {
      this.isLoading = true;
      this.subscription.add(this.autobahnService.fetchServiceDetails(highway, 'roadworks').subscribe({
        next: (data) => {
          console.log(data)
          this.roadworksData = data.roadworks.map((roadwork: any) => ({
            title: roadwork.title,
            subTitle: roadwork.subtitle
          }));
          this.changeDetectorRefs.detectChanges();
          this.isLoading = false;
        }
      }));
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }


    navigateToService(serviceName: string) {
      this.router.navigate([`${serviceName.toLowerCase()}`]);
    }

onViewDetails(element: any) {
  // Handle the action (e.g., navigate to a detail page or open a modal)
}

}
