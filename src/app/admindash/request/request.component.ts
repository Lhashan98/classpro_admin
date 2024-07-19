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
applyFilter() {
throw new Error('Method not implemented.');
}
  private apiUrl = 'http://5.181.217.67:8002/addreport/getAll';

  public reports: Report[] = [];
  public searchTerm = '';
  public department = '';
  public course = '';
  public module = '';
  public batch = '';
  public capacity = '';
  public nameofbuilding = '';
  public typeofclass = '';
  public requestdate = '';
  public starttime = '';
  public endtime = '';
  public availableclass = '';
  public State = '';
  public selectedBatch = '';
  public selectedBuilding = '';
  public uniqueBatches: string[] = [];
  public uniqueBuildings: string[] = [];
  public filteredClassroomsForAvailable: any[] = [];
  public selecteClassId = '';
  public isEditEnabled = false;
  public selectedState = ''; // Add this line to define selectedState property

  constructor(
    private http: HttpClient,
    private newReportService: AddreportService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private addReportService: AddreportService
  ) {}

  ngOnInit(): void {
    this.department = this.cookieService.get('department');
    this.route.params.subscribe(params => {
      this.department = params['department'] || this.department;
    });
    this.getReports();
  }

  private getReports(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        if (response.data) {
          this.reports = response.data;
        }
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  deleteReport(data: Report): void {
    this.http.delete(`http://5.181.217.67:8002/addreport/delete/${data._id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Request Deleted');
    });
  }

  get filteredReports() {
    return this.reports.filter(report => {
      // Check if searchTerm is included in any report property
      const includesSearchTerm = Object.values(report).some(val =>
        val && typeof val === 'string' && val.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  
      // Check if the selectedState matches the report's state or if no state is selected
      const matchesState = !this.selectedState || report.State === this.selectedState;
  
      return includesSearchTerm && matchesState;
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
    await this.getAllAvailableClasses(report);
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
            console.error('Error updating report Class:', error);
          }
        );
      this.isEditEnabled = false;
    }
  }

  getAllAvailableClasses(report: Report) {
    const requestBody = {
      capacity: report.capacity,
      buildingname: report.nameofbuilding,
      ClassType: report.typeofclass
    };

    this.http.post("http://5.181.217.67:8002/addclass/getSpecificClass", requestBody)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.filterClassroomsByTime(resultData.data);
      });
  }

  async filterClassroomsByTime(data: any[]) {
    const filteredClassrooms: any[] = [];
    this.filteredClassroomsForAvailable = [];
    for (const classroom of data) {
      await this.addReportService
        .getReportsByClassId({
          availableclass: classroom._id,
          requestdate: this.requestdate,
          starttime: this.starttime,
          endtime: this.endtime,
        })
        .subscribe((res: any) => {
          if (res.date?.length === 0) {
            filteredClassrooms.push(classroom);
          }
        });
    }
    this.filteredClassroomsForAvailable = filteredClassrooms;
  }
}