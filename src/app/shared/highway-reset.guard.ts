import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HigwayService } from './services/higway.service';

@Injectable({
  providedIn: 'root'
})
export class HighwayResetGuard implements CanActivate {

  constructor(private highwayService: HigwayService, private router: Router) {}

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("Guard activated for route: ", state.url);
    // If the route is one of the service types, reset highway
    if (state.url.includes('/highway-info')) {
      console.log("Resetting highway due to navigation to service type");
      this.highwayService.resetToDefaultHighway();
    }
    return true;
  }
}