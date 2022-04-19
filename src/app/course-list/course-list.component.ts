import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../utils/course.utils';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  public courseList:Course[]= []; // filtered list.
  public _courseList:Course[] = []; // complete course list
  
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  public deleteCourse(courseId:string):void{
    this.courseService.deleteCourse(courseId).subscribe((courses:Course[]) => this.courseList = courses);
  }

  public searchCourse(event:Event):void{
    const searchKey = (<HTMLInputElement>event.target).value.toLowerCase();
    const courses = JSON.parse(JSON.stringify(this._courseList));
   this.courseList = courses.filter((course:Course) => course.courseName.toLowerCase().includes(searchKey));
  }

  private getCourses():void{
      this.courseService.getCourseList().subscribe(courses => {
        this.courseList = courses;
        this._courseList = JSON.parse(JSON.stringify(this.courseList));
      })
  }

}
