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

  ngOnInit(): void {

  }

}
