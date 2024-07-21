import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AddreportService } from 'src/app/service/addreport.service';

interface Report {
  _id: string;
  department: string;
  course: string;
  module: string;
  batch: string;
  capacity: string;
  nameofbuilding: string;
  typeofclass: string;
  requestdate: string;
  starttime: string;
  endtime: string;
  ClassNumber: string;
  State: string;
  editing?: boolean;
  availableclass?: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  private apiUrl = 'http://5.181.217.67:8002/addreport/getAll';

  public reports: Report[] = [];
  public uniqueDepartments: string[] = [];
  public filteredReports: Report[] = [];
  public selectedDepartment = 'all';
  public selectedState = '';

  public isEditEnabled = false;
  public selecteClassId = '';
  public filteredClassroomsForAvailable: any[] = [];

  constructor(
    private http: HttpClient,
    private newReportService: AddreportService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private addReportService: AddreportService
  ) {}

  ngOnInit(): void {
    this.getReports();
  }

  private getReports(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        if (response.data) {
          this.reports = response.data;
          this.uniqueDepartments = [...new Set(this.reports.map(report => report.department))];
          this.filteredReports = this.reports;
        }
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  filterReports(): void {
    this.filteredReports = this.reports.filter(report => {
      const matchesDepartment = this.selectedDepartment === 'all' || report.department === this.selectedDepartment;
      const matchesState = !this.selectedState || report.State === this.selectedState;
      return matchesDepartment && matchesState;
    });
  }

  deleteReport(data: Report): void {
    this.http.delete(`http://5.181.217.67:8002/addreport/delete/${data._id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Request Deleted');
      this.getReports(); // Refresh reports after deletion
    });
  }

  updateState(data: Report): void {
    const updatedReport: Report = { ...data, State: 'accepted' };
    this.http.patch(`http://5.181.217.67:8002/addreport/update/${data._id}`, updatedReport)
      .subscribe(
        (response) => {
          console.log(response);
          alert('Report State updated to accepted');
          this.getReports();
        },
        (error) => {
          console.error('Error updating report State:', error);
        }
      );
  }

  async toggleEditing(report: Report) {
    this.isEditEnabled = true;
    report.editing = !report.editing;

  }

  async submitEdit(report: Report) {
    const selectedClass = this.filteredClassroomsForAvailable.find(item => item._id === this.selecteClassId);
    console.log('Selected class:', selectedClass);
    
    if (this.filteredClassroomsForAvailable.length) {
      report.ClassNumber = selectedClass.ClassNumber;
      report.availableclass = selectedClass._id;

      const updatedReport: Report = { ...report };

      this.http.patch(`http://5.181.217.67:8002/addreport/update/${report._id}`, updatedReport)
        .subscribe(
          (response) => {
            console.log(response);
            alert('Report edit class is successfully completed');
            this.getReports();
          },
          (error) => {
            console.error('Error updating report class:', error);
          }
        );
    }
  }
}
