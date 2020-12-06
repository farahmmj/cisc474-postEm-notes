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

  ngOnInit(): void {
    
  }

  public login(): void {
    this.svc.login("hello", "world").subscribe((data:any) => {

    }, error => {

    })
  }
}
