import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {

  classes = [ // temp data
    {name: "CISC 108", professor: "Greg Silber"},
    {name: "CISC 475", professor: "Greg Silber"},
  ]

  @Input() data: any;
  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void {

  }
}
