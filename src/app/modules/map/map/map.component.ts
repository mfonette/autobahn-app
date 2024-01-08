import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { AutobahnService } from 'src/app/shared/services/autobahn.service';
import { HigwayService } from 'src/app/shared/services/higway.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private markers: L.Marker[] = [];
  private subscription: Subscription = new Subscription();
  highway: any;
  serviceType: any;
  constructor(
    private highwayService: HigwayService,
    private autobahnService: AutobahnService
  ) {}

  ngOnInit(): void {
    this.highwayService.selectedHighway$.subscribe((highway) => {
      if (highway) {
        this.highway = highway;
        console.log(this.highway);
      }
    });

    this.highwayService.selectedService$.subscribe((serviceType) => {
      console.log('Current Service Type: ', serviceType);
      this.serviceType = serviceType;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.fetchMapDetails();
  }

  private initMap(): void {
    const centerLat = 52;
    const centerLong = 10;
    const zoomLevel = 6;
    this.map = L.map('map').setView([centerLat, centerLong], zoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  fetchMapDetails() {
    if (this.serviceType == 'roadworks') {
      this.addRoadworkToMap(this.highway);
    } else if (this.serviceType == 'parking-lorries') {
      this.addParkingLorryToMap(this.highway);
    } else if (this.serviceType == 'electric-charging-stations') {
      this.addElectricChargingStationsToMap(this.highway);
    } else if (this.serviceType == 'closures') {
      this.addClosuresToMap(this.highway);
    }
  }

  private addItemsToMap(items: any[]): void {
    items.forEach((item) => {
      const lat = parseFloat(item.coordinate.lat);
      const long = parseFloat(item.coordinate.long);
      const marker = L.marker([lat, long]).addTo(this.map);
      marker.bindPopup(this.createPopupContent(item));
      this.markers.push(marker);
    });
    this.adjustMapView();
  }

  addRoadworkToMap(highway: string) {
    this.subscription.add(
      this.autobahnService.fetchServiceDetails(highway, 'roadworks').subscribe({
        next: (data) => {
          this.addItemsToMap(data.roadworks);
        },
      })
    );
  }

  private addParkingLorryToMap(highway: any): void {
    this.subscription.add(
      this.autobahnService
        .fetchServiceDetails(highway, 'parking_lorry')
        .subscribe((data) => {
          this.addItemsToMap(data.parking_lorry);
        })
    );
  }

  private addElectricChargingStationsToMap(highway: any): void {
    this.subscription.add(
      this.autobahnService
        .fetchServiceDetails(highway, 'electric_charging_station')
        .subscribe((data) => {
          this.addItemsToMap(data.electric_charging_station);
        })
    );
  }

  private addClosuresToMap(highway: any): void {
    this.subscription.add(
      this.autobahnService
        .fetchServiceDetails(highway, 'closure')
        .subscribe((data) => {
          this.addItemsToMap(data.closure);
        })
    );
  }

  private createPopupContent(item: any): string {
    return `<b>${item.title}</b><br>${item.description.join('<br>')}`;
  }

  private adjustMapView(): void {
    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds().pad(0.5));
  }
}
