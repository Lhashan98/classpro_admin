import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://5.181.217.67:8002'; // Adjust this according to your API endpoint

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const bodyData = {
      email: email,
      password: password
    };

    return this.http.post(`${this.baseUrl}/login`, bodyData);
  }
}
