import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent } from './components/course-list/course-edit/course-edit.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',component:CourseListComponent},
  {path:':id/edit',component:CourseEditComponent},
  {path:'new-course',component:CourseEditComponent,data:{new:true}},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
