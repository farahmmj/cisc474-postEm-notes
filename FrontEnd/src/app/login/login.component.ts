import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
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
