import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  getAvailableClasses() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://5.181.217.67:8002/addreport'; // Adjust the URL to your backend endpoint

  constructor(private http: HttpClient) { }

  getreport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  addreport(reportData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, reportData);
}}
