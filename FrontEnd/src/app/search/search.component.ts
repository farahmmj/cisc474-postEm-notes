import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  classes: any;


  constructor(public svc:PostEmService, public router:Router) { }

  // Redirects the user to welcome page if logged out.
  ngOnInit(): void {
    
    this.svc.CurrentClasses.subscribe((data: any) => {
      this.classes = data;
    });
    this.svc.getClassesByProf("Bart");
  }

  viewClass(name: string) {

  }
}
