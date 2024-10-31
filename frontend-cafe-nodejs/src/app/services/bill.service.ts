import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  generateReport(data:any) {
    return this.httpClient.post(`${this.url}/bill/generateReport`, data, { headers:this.getHeaders() });
  }

  getPDF(data:any):Observable<Blob> {
    return this.httpClient.post(`${this.url}/bill/getPdf`, data, {responseType: 'blob', headers:this.getHeaders() });
  }
}
