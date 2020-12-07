import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  loading = false;
  uploadForm = new FormGroup({
    class: new FormControl('', [Validators.required]),
    professor: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  constructor(public svc:PostEmService, public router:Router) {}

  get class() {
    return this.uploadForm.get('class');
  }

  get professor() {
    return this.uploadForm.get('professor');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  ngOnInit(): void {
  }

  upload() {
    // to do: not implemented
  }

}
