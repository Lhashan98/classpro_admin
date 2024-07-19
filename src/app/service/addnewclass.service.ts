import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddnewclassService {
  private apiUrl = 'http://5.181.217.67:8002/addclass';

  constructor(private http: HttpClient) {}

  addNewClass(addNewClassData: any): Observable<any> {
    return this.http.post(`http://5.181.217.67:8002/addclass/create`, addNewClassData);
  }


}
