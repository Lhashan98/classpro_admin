import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cordinators',
  templateUrl: './cordinators.component.html',
  styleUrls: ['./cordinators.component.css']
})
export class CordinatorsComponent implements OnInit {
  cordinatorsArray: any[] = [];
  selectedCoordinator: any;
  coordinatorForm!: FormGroup;
  searchTerm: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.coordinatorForm = this.fb.group({
      enumber: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      telephone: ['', Validators.required]
    });

    this.getAllCoordinatorDetails();
  }

  getAllCoordinatorDetails() {
    this.http.get<any>('http://5.181.217.67:8002/addcordinators/getAll')
      .subscribe(
        (resultData: any) => {
          this.cordinatorsArray = resultData.data;
        },
        (error: any) => {
          console.error('Error fetching coordinator data:', error);
          Swal.fire('Error', 'Failed to fetch coordinator data!', 'error');
        }
      );
  }

  editCoordinator(coordinator: any) {
    this.selectedCoordinator = coordinator;
    this.coordinatorForm.patchValue({
      enumber: coordinator.enumber,
      name: coordinator.name,
      email: coordinator.email,
      department: coordinator.department,
      telephone: coordinator.telephone
    });

    // Open the edit form as a SweetAlert2 modal
    Swal.fire({
      // title: 'Edit Coordinator',
      html: this.generateEditFormHTML(),
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      preConfirm: () => {
        this.saveChanges(); // Manually handle form submission
      }
    });
  }

  generateEditFormHTML(): string {
    return `
      <style>
        #editForm {
          width: 80%;
          margin: 0 auto;
        }
  
        #editForm h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
  
        #editCoordinatorForm {
          display: flex;
          flex-direction: column;
        }
  
        #editCoordinatorForm label {
          margin-bottom: 5px;
        }
  
        #editCoordinatorForm input {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
  
        #editCoordinatorForm input[type="text"],
        #editCoordinatorForm input[type="email"],
        #editCoordinatorForm input[type="tel"] {
          width: 100%;
        }
  
        #editCoordinatorForm input[type="submit"] {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 15px 20px;
          font-size: 16px;
          cursor: pointer;
        }
  
        #editCoordinatorForm input[type="submit"]:hover {
          background-color: #4a45a0;
        }

        
        </style>

      <div id="editForm">
        <h2>Edit Coordinator</h2>
        <form id="editCoordinatorForm">
          <label for="enumber">Employee Number:</label>
          <input type="text" id="enumber" class="swal2-input" value="${this.selectedCoordinator.enumber}">
          <label for="name">Name:</label>
          <input type="text" id="name" class="swal2-input" value="${this.selectedCoordinator.name}">
          <label for="email">Email:</label>
          <input type="email" id="email" class="swal2-input" value="${this.selectedCoordinator.email}">
          <label for="department">Department:</label>
          <input type="text" id="department" class="swal2-input" value="${this.selectedCoordinator.department}">
          <label for="telephone">Telephone:</label>
          <input type="tel" id="telephone" class="swal2-input" value="${this.selectedCoordinator.telephone}">
        </form>
      </div>
    `;
  }
  
  saveChanges() {
    if (this.coordinatorForm.invalid) {
      console.error('Invalid form data. Please fill in all required fields.');
      return;
    }
  
    const updatedCoordinatorData = {
      enumber: (document.getElementById('enumber') as HTMLInputElement).value,
      name: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      department: (document.getElementById('department') as HTMLInputElement).value,
      telephone: (document.getElementById('telephone') as HTMLInputElement).value,
    };
    const coordinatorId = this.selectedCoordinator._id;
  
    this.http.patch(`http://5.181.217.67:8002/addcordinators/update/${coordinatorId}`, updatedCoordinatorData)
      .subscribe(
        (response: any) => {
          console.log('Coordinator updated successfully:', response);
          Swal.fire('Success', 'Coordinator updated successfully!', 'success');
          this.getAllCoordinatorDetails(); // Fetch updated data
          this.closeEditForm();
        },
        (error: any) => {
          console.error('Error updating coordinator:', error);
          Swal.fire('Error', 'Failed to update coordinator!', 'error');
        }
      );
  }
  
  closeEditForm() {
    this.selectedCoordinator = null;
    this.coordinatorForm.reset();
    Swal.close(); // Close the SweetAlert2 modal
  }
  deleteCoordinator(coordinatorItem: any) {
    this.http.delete("http://5.181.217.67:8002/addcordinators/delete/" + coordinatorItem._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Coordinator Deleted");
      this.getAllCoordinatorDetails();
    });
  }


}
