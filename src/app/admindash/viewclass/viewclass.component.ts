import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewclass',
  templateUrl: './viewclass.component.html',
  styleUrls: ['./viewclass.component.css']
})
export class ViewclassComponent {
  BuildingArray: any[] = [];
  filteredData: any[] = [];
  buildingOptions: string[] = [];
  ReportArray: any[] = [];
  selectedBuilding: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAllClass();
  }

  getAllClass() {
    this.http.get("http://5.181.217.67:8002/addclass/getAll")
      .subscribe((resultData: any) => {
        console.log("Class getAllClass data:", resultData);
        this.BuildingArray = resultData.data;
        this.populateBuildingOptions(); // Populate building options after data retrieval
        this.filterByBuilding(); // Initially filter the data
      });
  }

  populateBuildingOptions(): void {
    this.buildingOptions = [...new Set(this.BuildingArray.map(item => item.buildingname))];
  }
  

  editBuilding(building: any) {
    // Logic for editing the building
    console.log("Editing building:", building);
    // Add your edit functionality here
  }

  deleteBuilding(building: any) {
    this.http.delete("http://5.181.217.67:8002/addclass/delete/" + building._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Class Deleted");
      this.getAllClass(); 
      });
    }

  filterByBuilding(): void {
    if (this.selectedBuilding) {
      this.filteredData = this.BuildingArray.filter(item => item.buildingname === this.selectedBuilding);
    } else {
      this.filteredData = [...this.BuildingArray]; // Reset to all data if no building selected
    }
  }
}
