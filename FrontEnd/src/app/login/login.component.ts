import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostEmService } from '../post-em.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(public svc:PostEmService, public router:Router) { }

  ngOnInit(): void {  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public login(): void {
    this.loading = true;
    this.svc.login(this.email.value, this.password.value).subscribe((data:any) => {
      this.loading = false;
      this.svc.token = data.token;
      this.svc.CurrentUser.next(data.user.email);
      this.router.navigate(['home']);
    }, error => {
      alert(error.message);
      this.loading = false;
    })
  }
}
