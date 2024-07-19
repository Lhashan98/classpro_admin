import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {
    console.log('Attempting login...');
    const credentials = { username: this.username, password: this.password };
    console.log('Request Credentials:', credentials);

    this.loginService.login(credentials).subscribe(
      (response: any) => {
        console.log('Login Response:', response);

        if (response.success) {
          console.log('Received usertype:', response.usertype);
          console.log('Received Department:', response.Department);

          // Navigate based on usertype and department
          if (response.usertype === 'coordinator' && response.Department !== undefined) {
            this.router.navigate([`/codashboard/${response.Department}`]);
          } else if (response.usertype === 'admin') {
            this.router.navigate(['/admindash']);
          } else {
            this.errorMessage = 'Invalid usertype or department.';
            console.error('Invalid usertype or department:', response.usertype, response.Department);
          }
        } else {
          this.errorMessage = response.message;
          this.successMessage = '';
          console.error(response.message);
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
        this.successMessage = '';
        console.error('An error occurred:', error);
      }
    );
  }
}
