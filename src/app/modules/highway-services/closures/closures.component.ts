import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ColumnDefinition } from 'src/app/shared/column-definition';
import { AutobahnService } from 'src/app/shared/services/autobahn.service';
import { HigwayService } from 'src/app/shared/services/higway.service';

@Component({
  selector: 'app-closures',
  templateUrl: './closures.component.html',
  styleUrls: ['./closures.component.css']
})
export class ClosuresComponent implements OnInit {
  isLoading = true;
  highwayId!: any;
  closureData!: any;
  private subscription: Subscription = new Subscription();
  columns: ColumnDefinition[] = [
    { header: 'Highway', dataKey: 'title' },
    { header: 'Title', dataKey: 'subTitle' }
  ];
  
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private highwayService: HigwayService,
    private activatedRoute: ActivatedRoute,
    private autobahnService: AutobahnService,
    ) { 
      this.fetchInitialData();
    }

    ngOnInit() {
      this.highwayService.selectedHighway$.subscribe(highway => {
        if (highway) {
          console.log(highway)
          this.fetchData(highway);
        }
      });

      const serviceType = this.activatedRoute.snapshot.routeConfig?.path;
      if(serviceType) {
        this.highwayService.changeServiceType(serviceType);
      }
    }

    fetchInitialData() {
      this.highwayService.selectedHighway$.pipe(take(1)).subscribe(highway => {
        this.fetchData(highway);
      });
    }

    fetchData(highway: string) {
      this.isLoading = true;
      this.subscription.add(this.autobahnService.fetchServiceDetails(highway, 'closure').subscribe({
        next: (data) => {
          console.log('parking',data)
          this.closureData = data.closure.map((closure: any) => ({
            title: closure.title,
            subTitle: closure.subtitle
          }));
          this.changeDetectorRefs.detectChanges();
          this.isLoading = false;
        }
      }));
    }

    ngOnDestroy() {
      this.subscription.unsubscribe(); 
    }

onViewDetails(element: any) {
  // Handle the action (e.g., navigate to a detail page or open a modal)
}

}
