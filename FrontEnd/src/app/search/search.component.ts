import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public svc:PostEmService, public router:Router) { }

  // Redirects the user to welcome page if logged out.
  ngOnInit(): void {
    this.svc.CurrentUser.subscribe(user => {
      if (user == undefined) {
        this.router.navigate(['welcome']);
      }
    });
  }
}
