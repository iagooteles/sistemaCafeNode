import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  signup(data:any) {
    return this.httpClient.post(`${this.url}/user/signup`, data, { headers:this.getHeaders()});
  }

  forgotPassword(data:any) {
    return this.httpClient.post(`${this.url}/user/forgotPassword`, data , { headers:this.getHeaders()})
  }

  login(data:any) {
    return this.httpClient.post(`${this.url}/user/login`, data, { headers:this.getHeaders()})
  }

  checkToken() {
    return this.httpClient.get(`${this.url}/user/checkToken`);
  }

  changePassword(data: any) {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${this.url}/user/changePassword`, data, { headers:this.getHeaders()});
  }

  getUsers() {
    return this.httpClient.get(`${this.url}/user/get`, { headers:this.getHeaders()})
  }

  update(data: any) {
    return this.httpClient.patch(`${this.url}/user/update`, data, { headers:this.getHeaders()})
  }

}
