import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent } from './course-list/course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  {path:'',component:CourseListComponent},
  {path:':id/edit',component:CourseEditComponent},
  {path:'new-course',component:CourseEditComponent,data:{new:true}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
