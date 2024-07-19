import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  
  providedIn: 'root'
})
export class AddreportService {
  private apiUrl = 'http://5.181.217.67:8002'; // Adjust the URL to your backend endpoint


  constructor(private http: HttpClient) { }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/addreport/getAll`);
  }

  addNewReport(reportData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addreport/create`, reportData);
  }
  getReportsByClassId(reportData: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/addreport/getByCladdIdAndDate`, reportData);
}

}

