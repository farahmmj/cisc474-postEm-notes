import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  test: any;
  loading = false;
  uploadForm = new FormGroup({
    class: new FormControl('', [Validators.required]),
    professor: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(public svc:PostEmService, public router:Router) { }

  get class() {
    return this.uploadForm.get('class');
  }

  get professor() {
    return this.uploadForm.get('professor');
  }

  get content() {
    return this.uploadForm.get('content');
  }

  // Redirects the user to welcome page if logged out.
  ngOnInit(): void {

  }

  upload() {
    if (!this.uploadForm.valid) {
      return;
    }

    this.loading = true;
    this.test = [this.svc.token, this.content.value, this.class.value, this.professor.value];
    this.svc.postNote(this.content.value, this.class.value, this.professor.value).subscribe((data:any) => {
      this.loading = false;
      this.router.navigate(['my-notes']);
      alert("You successfully posted your note.");
    }, err => {
      this.loading = false;
      alert(err.message);
    });
  }

}
