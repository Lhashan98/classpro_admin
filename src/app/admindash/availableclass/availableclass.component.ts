import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
import { ReportService } from 'src/app/service/report.service'; // Import ReportService
import { AddreportService } from 'src/app/service/addreport.service'; // Import AddreportService

@Component({
  selector: 'app-timetable',
  templateUrl: './availableclass.component.html',
  styleUrls: ['./availableclass.component.css']
})
export class AvailableclassComponent implements OnInit {
  classArray: any[] = [];
  selectedavailableclass: string = "";
  selectedtypeofclass: string = "";

  selectedcourse_name: string = "";
  filteredItems: any[] = [];
  CourseArray: any[] = [];
  searchInput: string = "";

  department: string = "";
  course: string = "";
  module: string = "";
  batch: string = "";
  capacity: number = 0; // Corrected type and initialized with default value
  nameofbuilding: string = "";
  typeofclass: string = "";
  requestdate: string = "";
  starttime: string = "";
  endtime: string = "";
  availableclass: string = "";
  ClassNumber:string="";
  State: string = "pending";
  filteredClassrooms: any[] = []; // Initialize filteredClassrooms
  filteredClassroomsByType: any[] = [];
  filteredClassroomsForAvailable: any[] = [];
  reports: any[] = [];

  constructor(
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient,
    private addReportService: AddreportService
  ) {}

  ngOnInit(): void {
    this.department = this.cookieService.get("department");

    this.route.params.subscribe((params) => {
      this.department = params["department"] || this.department;
      this.getAllCourse();
    });

    // Fetch available classes when the component initializes
    this.getAllclass();
  }

  getAllclass() {
    this.http
      .get("http://5.181.217.67:8002/addclass/getAll")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.classArray = resultData.data;
      });
  }

  getAllCourse() {
    this.http
      .get(
        'http://5.181.217.67:8002/addcourse/getAll?department=${this.department}'
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.CourseArray = resultData.data;
        this.filteredItems = this.CourseArray.filter(
          (item) => item.department === this.department
        );
      });
  }

  async getAllReport(
    classId: string,
    date: string,
    starttime: string,
    endtime: string
  ) {
    this.reports = [];
    await this.addReportService
      .getReportsByClassId({
        availableclass: classId,
        requestdate: date,
        starttime: starttime,
        endtime: endtime,
      })
      .subscribe((res: any) => {
        this.reports = res.date;
      });
    console.log(this.reports, "reportsssss");
    return this.reports;
  }

  searchCourse() {
    if (this.searchInput.trim() !== "") {
      this.CourseArray = this.CourseArray.filter((Course) =>
        Course.course_name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
      );
    } else {
      this.getAllCourse();
    }
  }

  groupBy(array: any[], key: string): any[] {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  }

  // Function to get all the group values
  getAllGroupValues(array: any[], key: string): any[] {
    const grouped = this.groupBy(array, key);
    return Object.values(grouped);
  }

  logout() {
    // Clear cookies and navigate to the login page
    this.cookieService.delete("department");
    this.router.navigate(["/login"]); // Replace '/login' with the path to your login page
  }

  save(): void {

    // Get the selected class object based on the selected index of the dropdown
  const selectedClass = this.filteredClassroomsForAvailable.find(classroom => classroom._id === this.selectedavailableclass);

  if (!selectedClass) {
    console.error('Selected class not found');
    return;
  }
    let reportData = {
      department: this.department,
      course: this.selectedcourse_name,
      module: this.module,
      batch: this.batch,
      capacity: this.capacity,
      nameofbuilding: this.nameofbuilding,
      typeofclass: this.typeofclass,
      requestdate: this.requestdate,
      starttime: this.starttime,
      endtime: this.endtime,
      availableclass: this.selectedavailableclass,
      ClassNumber: selectedClass.ClassNumber,
      State: this.State,
    };

    this.reportService.addreport(reportData).subscribe(
      (response: any) => {
        console.log("Course added successfully", response);
        alert("Course added successfully");
        this.resetForm();
        this.router.navigate(["/Checkreport"]);
      },
      (error: any) => {
        console.error("Error adding course", error);
        alert("Error adding course. Please try again.");
      }
    );
  }

  private resetForm(): void {
    this.department = "";
    this.course = "";
    this.module = "";
    this.batch = "";
    this.capacity = 0; // Reset to default value
    this.nameofbuilding = "";
    this.typeofclass = "";
    this.requestdate = "";
    this.starttime = "";
    this.endtime = "";
    this.availableclass = "";
    this.ClassNumber="";
    this.State = "Pending"; // Corrected typo in "pending"
    this.filteredClassrooms = []; // Reset filteredClassrooms
  }

  filterClassrooms(): void {
    if (this.capacity) {
      this.filteredClassrooms = this.classArray.filter(
        (classroom) => classroom.capacity >= this.capacity
      );
      console.log("=======", this.filteredClassrooms);
    }
  }

  isClassBooked(classNumber: string): boolean {
    // Check if the class is booked (accepted or pending)
    return this.filteredItems.some(
      (item) =>
        item.availableclass === classNumber &&
        (item.State === "accepted" || item.State === "pending")
    );
  }

  filterClassroomsByBuilding(buildingName: string): void {
    if (buildingName) {
      this.filteredClassrooms = this.classArray.filter(
        (classroom) => classroom.buildingname === buildingName
      );
    } else {
      this.filteredClassrooms = [];
    }
  }

  filterclassroomsByType() {
    console.log(this.typeofclass);
    if (this.typeofclass) {
      this.filteredClassroomsByType = this.filteredClassrooms.filter(
        (classroom) => classroom.ClassType === this.typeofclass
      );
      console.log(this.filteredClassroomsByType);
      if (this.filteredClassroomsByType.length == 0) {
        console.log("Not Available ", this.typeofclass);
      }
    }
  }

  filterClassroomsByDate() {
    console.log(this.filteredClassroomsByType);
    // get classId==availableclssId in addnewreports
    console.log("date");
  }

  async filterclassroomsByTime() {
    const filteredClassroomsByType: any[] = [];
    this.filteredClassroomsForAvailable = [];
    if (!this.requestdate || !this.starttime || !this.endtime) {
      return;
    }
    for (const classroom of this.filteredClassroomsByType) {
      await this.addReportService
        .getReportsByClassId({
          availableclass: classroom._id,
          requestdate: this.requestdate,
          starttime: this.starttime,
          endtime: this.endtime,
        })
        .subscribe((res: any) => {
          if (res.date?.length == 0) {
            filteredClassroomsByType.push(classroom);
          }
        });
    }
    this.filteredClassroomsForAvailable = filteredClassroomsByType;
  }
}
