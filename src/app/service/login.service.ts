import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://5.181.217.67:8002'; // Removed '/login' from base URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveLogin(loginData: { username: string; password: string; usertype: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/save`, loginData);
  }
}
