import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  loggedIn = false;


  @Input() activeClass = 'active';
  constructor(public svc:PostEmService, public router:Router) {}

  ngOnInit(): void {
    this.svc.CurrentUser.subscribe((user) => {
      this.loggedIn = user != undefined;
    });
  }

}
