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

  // Redirects the user to home page if already logged on.
  ngOnInit(): void {
    this.svc.CurrentUser.subscribe(user => {
      if (user != undefined) {
        this.router.navigate(['home']);
      }
    });
  }

}
