import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loading = false;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void { }

  get email() {
    return this.signupForm.get('email');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  public signup(): void {
    if (!this.signupForm.valid) {
      return;
    }

    this.loading = true;
    this.svc.signup(this.email.value, this.username.value, this.password.value).subscribe((data:any) => {
      this.loading = false;
      this.router.navigate(['login']);
      alert("Account Created!");
    }, error => {
      this.loading = false;
      alert(error.message);
    });
  }
}

function ValidatePassword(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && control.value.length != 10) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
}