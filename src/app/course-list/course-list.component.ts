import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../utils/course.utils';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CoursesComponent implements OnInit {

  public courseList:Course[]= [];
  
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  public deleteCourse(courseId:string):void{
    this.courseService.deleteCourse(courseId).subscribe((courses:Course[]) => this.courseList = courses);
  }

  private getCourses():void{
      this.courseService.getCourseList().subscribe(courses => {
        this.courseList = courses;
      })
  }

}
