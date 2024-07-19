import { Component } from '@angular/core';
import { AddnewclassService } from 'src/app/service/addnewclass.service';

@Component({
  selector: 'app-addnewclass',
  templateUrl: './addnewclass.component.html',
  styleUrls: ['./addnewclass.component.css']
})

export class AddnewclassComponent {
  buildingname: string = "";
  ClassNumber: string = "";
  capacity: string = "";
  selectedClassType: string = ""; // New property for selected class type
  availability:string="available";


  constructor(private addnewclassservice: AddnewclassService) {}

  save() {
    const addnewclassData = {
      buildingname: this.buildingname,
      ClassNumber: this.ClassNumber,
      capacity: this.capacity,
      ClassType: this.selectedClassType,
      availability:this.availability,
      
    };

    this.addnewclassservice.addNewClass(addnewclassData)
    .subscribe((response: any) => {
      if (response.status === true) {
        alert('Class added successfully'); // Show a simple alert
      } else {
        alert('Failed to add Class: ' + response.message); // Show an alert with an error message
      }
    });
  }

  // Function to handle the class type selection change
  onClassTypeChange(event: any) {
    this.selectedClassType = event.target.value; // Update selected class type
  }
}
