import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportdata: any[] = [];
  ReportArray: any[] = [];
  filteredData: any[] = [];
  batchOptions: string[] = [];
  selectedBatch: string = '';
  buildingOptions: string[] = [];
  selectedBuilding: string = '';
  selectedDay!: string;
  dayOptions: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedDepartment: string = ''; // New property for selected department
  departmentOptions: string[] = []; 
  selectedCourse: string = ''; // Define selectedCourse property
  courseOptions: string[] = []; //

  @ViewChild('tableToExport') tableToExport!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllReporDetails();
  }

  getAllReporDetails() {
    this.http.get<any>('http://5.181.217.67:8002/addreport/getAll')
      .subscribe(
        (resultData: any) => {
          this.ReportArray = resultData.data;
          this.selectedDay = '';
          this.populateBatchOptions();
          this.populateBuildingOptions();
          this.populateDepartmentOptions(); 
          this.populatecourseOptions(); 
          this.filteredData = this.ReportArray;
        },
        (error: any) => {
          console.error('Error fetching coordinator data:', error);
        }
      );
  }

  populateBatchOptions(): void {
    this.batchOptions = [...new Set(this.ReportArray.map(item => item.batch))];
  }

  populateBuildingOptions(): void {
    this.buildingOptions = [...new Set(this.ReportArray.map(item => item.nameofbuilding))];
  }
  populateDepartmentOptions(): void {
    this.departmentOptions = [...new Set(this.ReportArray.map(item => item.department))];
  }

  populatecourseOptions(): void {
    this.courseOptions = [...new Set(this.ReportArray.map(item => item.course))];
  }

 


  // filterReportsByTimeframe() {
  //   if (this.selectedTimeframe === 'week') {
  //     // Implement filtering for the current week
  //   } else if (this.selectedTimeframe === 'month') {
  //     // Implement filtering for the current month
  //   } else if (this.selectedTimeframe === 'year') {
  //     // Implement filtering for the current year
  //   }
  //   // Add additional conditions as needed
  // }

  filterByBatch(): void {
    if (this.selectedBatch) {
      this.filteredData = this.ReportArray.filter(item => item.batch === this.selectedBatch);
    } else {
      this.filteredData = this.ReportArray;
    }
  }

  filterByBuilding(): void {
    if (this.selectedBuilding) {
      this.filteredData = this.ReportArray.filter(item => item.nameofbuilding === this.selectedBuilding);
    } else {
      this.filteredData = this.ReportArray;
    }
  }

  filterByDepartment(): void { // New method for filtering by department
    if (this.selectedDepartment) {
      this.filteredData = this.ReportArray.filter(item => item.department === this.selectedDepartment);
    } else {
      this.filteredData = this.ReportArray;
    }
  }

  filterByCourses(): void {
    if (this.selectedCourse) {
      this.filteredData = this.ReportArray.filter(item => item.course === this.selectedCourse);
    } else {
      this.filteredData = this.ReportArray;
    }
  }

  getDayType(date: string): string {
    const dayOfWeek = new Date(date).getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[dayOfWeek];
  }
  filterByDay() {
    if (this.selectedDay) {
      this.filteredData = this.ReportArray.filter(item => this.getDayType(item.requestdate) === this.selectedDay);
    } else {
      this.filteredData = this.ReportArray;
    }
  }
//   searchByDepartment() {
//     if (this.searchTerm.trim() !== '') { // Check if searchTerm is not empty
//       this.ReportArray = this.ReportArray.filter(coordinator =>
//         coordinator.department.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//   }
// }

// onTimeframeChange() {
//   this.filterReportsByTimeframe();
// }

onDepartmentChange() {
  this.filterByDepartment();
}

onBuildingChange() {
  this.filterByBuilding();
}
}
