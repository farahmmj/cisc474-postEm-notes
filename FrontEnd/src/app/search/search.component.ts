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
  notes: any;

  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void {
    this.svc.CurrentNotes.subscribe((data:any) => {
      this.notes = data;
      this.classes = undefined;
    });
    this.svc.CurrentClasses.subscribe((data: any) => {
      this.classes = data;
      this.notes = undefined;
    });
  }

  viewClass(name: string) {

  };
}
