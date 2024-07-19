import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CordinatorService {
  login(loginData: { username: any; password: any; usertype: any; department: any; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://5.181.217.67:8002'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

 

  getAllCoordinators(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/getAll`);
  }

  createCoordinator(coordinatorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/save`, coordinatorData);
  }

  // Add more methods for updating, deleting, etc. if needed
}
