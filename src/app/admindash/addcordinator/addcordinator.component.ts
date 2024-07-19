import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addcordinator',
  templateUrl: './addcordinator.component.html',
  styleUrls: ['./addcordinator.component.css']
})
export class AddcordinatorComponent implements OnInit {
  usertype: string = 'coordinator';
  enumber: string = "";
  name: string = "";
  email: string = "";
  department: string = "";
  address: string = "";
  telephone: string = "";
  password: string = "";
  cordinatorsArray: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  save() {
    if (!this.enumber || !this.name || !this.email || !this.telephone) {
      console.error("Please fill in all required fields.");
      return;
    }

    let bodyData = {
      "enumber": this.enumber,
      "name": this.name,
      "email": this.email,
      "telephone": this.telephone,
      "username": this.email,
      "password": this.password,
      "department": this.department,
      "usertype": this.usertype
    };

    this.http.post("http://5.181.217.67:8002/addcordinators/create", bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert("Coordinator Registered Successfully");
          this.resetForm();
        },
        (error: any) => {
          console.error("Error occurred during registration:", error);
          alert("Error occurred during registration. Please try again.");
        }
      );
      this.http.post("http://5.181.217.67:8002/login/save", bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          // Handle the login response as needed
        },
        (error: any) => {
          console.error("Error occurred during login:", error);
          alert("Error occurred during login. Please try again.");
        }
      );
  }

  // login() {
  //   let loginData = {
  //     "username": this.email,
  //     "password": this.password,
  //     "usertype": this.usertype,
  //     "department": this.department
  //   };

    
  // }

  private resetForm() {
    this.enumber = '';
    this.name = '';
    this.email = '';
    this.department = '';
    this.address = '';
    this.telephone = '';
    this.password = '';
  }
}
