import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent {
  
  BuildingArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.getAllClass();
  }

  getAllClass() {
    this.http.get("http://5.181.217.67:8002/addclass/getAll")
      .subscribe((resultData: any) => {
        console.log("Class getAllClass data:", resultData);
        this.BuildingArray = resultData.data;
      });
  }

  editBuilding(building: any) {
    // Logic for editing the building
    console.log("Editing building:", building);
    // Add your edit functionality here
  }

  deleteBuilding(building: any) {
    // Logic for deleting the building
    console.log("Deleting building:", building);
    // Add your delete functionality here
  }
}

