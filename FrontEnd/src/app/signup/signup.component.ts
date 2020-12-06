import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void {
    this.svc.CurrentUser.subscribe(user => {
      this.router.navigate(['home']);
    });
  }

  public signup(): void {
    this.svc.signup("email", "user", "pass").subscribe((data:any) => {
      this.router.navigate(['login']);
    }, error => {
        // display error message
    });
  }

}
