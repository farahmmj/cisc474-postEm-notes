import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadComponent } from './upload/upload.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'search', component: SearchComponent},
  {path: 'uploadFile', component: UploadFileComponent},
  {path: 'my-notes', component: MyNotesComponent},
  {path: 'view-class', component: ViewClassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
