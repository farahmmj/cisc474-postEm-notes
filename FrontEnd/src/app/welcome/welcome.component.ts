import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public svc:PostEmService, public router:Router) { }

  // Redirects the user to home page if already logged in.
  ngOnInit(): void {
    this.svc.CurrentUser.subscribe(user => {
      if (user != undefined) {
        this.router.navigate(['home']);
      }
    });
  }

}
