import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
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
    return this.httpClient.post(`${this.url}/category/add`, data, { headers: this.getHeaders() });
  }

  update(data:any) {
    return this.httpClient.patch(`${this.url}/category/update`, data, { headers: this.getHeaders() });
  }

  getCategories(): Observable<any>  {
    return this.httpClient.get(`${this.url}/category/get`, { headers: this.getHeaders() });
  }

}
