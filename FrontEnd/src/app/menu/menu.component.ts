import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  loggedIn = false;
  searchForm = new FormGroup({
    search: new FormControl(''),
    criteria: new FormControl(''),
  });

  @Input() activeClass = 'active';
  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void {
    this.svc.CurrentUser.subscribe((user:any) => {
      this.loggedIn = user != undefined;
    });
  }

  get search() {
    return this.searchForm.get('search');
  }

  get criteria() {
    return this.searchForm.get('criteria');
  }

  submitSearch() {
    if (this.criteria.value === "class") {
      this.svc.getClassesByID(this.search.value);
      this.router.navigate(['search']);      
    } else if (this.criteria.value === "professor") {
      this.svc.getClassesByProf(this.search.value);
      this.router.navigate(['search']);
    }
  }

  logout() {
    this.svc.logout();
    this.router.navigate(['welcome']);
  }

}
