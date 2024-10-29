import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
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

  add(data:any) {
    return this.httpClient.post(`${this.url}/product/add`, data, { headers:this.getHeaders() });
  }

  update(data:any) {
    return this.httpClient.patch(`${this.url}/product/update`, data, { headers:this.getHeaders() });
  }

  getProducts(): Observable<any>  {
    return this.httpClient.get(`${this.url}/product/get`, { headers:this.getHeaders() });
  }

  updateStatus(data:any) {
    return this.httpClient.patch(`${this.url}/product/updateStatus`, data, { headers:this.getHeaders() });
  }

  delete(id:any) {
    return this.httpClient.delete(`${this.url}/product/delete/${id}`, { headers:this.getHeaders() });
  }
}
