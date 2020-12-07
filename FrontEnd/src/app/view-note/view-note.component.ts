import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {

  note: any;
  professor: any;
  class: any;
  constructor(public svc:PostEmService, public router:Router) {}

  ngOnInit(): void {
    this.svc.CurrentNote.subscribe((note:any) => {
      this.note = note['note'];
      this.class = note['classId'];
      this.professor = note['professor'];
    });
  }

}
