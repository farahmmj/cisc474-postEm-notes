import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadForm = new FormGroup({
    content: new FormControl(''),
  });

  constructor(public svc:PostEmService, public router:Router) { }

  // Redirects the user to welcome page if logged out.
  ngOnInit(): void {

  }

}
