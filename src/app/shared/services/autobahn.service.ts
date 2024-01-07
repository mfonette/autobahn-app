import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutobahnService {
  private baseUrl: string = 'https://verkehr.autobahn.de/o/autobahn/';

  constructor(private http: HttpClient) { }

  fetchHighways(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  fetchServiceDetails(highway: string, serviceType: string): Observable<any> {
    const url = `${this.baseUrl}${highway}/services/${serviceType}`;
    return this.http.get<any>(url);
  }
}
