import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddfacultyService {
  private apiUrl = 'http://5.181.217.67:8002/addfaculty';

  constructor(private http: HttpClient) {}

  addFaculty(addFacultyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, addFacultyData);
  }

  getAllFaculty(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
}
