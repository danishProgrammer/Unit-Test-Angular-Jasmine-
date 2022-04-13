import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { Course } from '../utils/course.utils';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = '../.././assets/courses.json';
  private courses:Course[] = [];
  constructor(private httpClient:HttpClient) { }

  getCourseList(): Observable<Course[]>{
    if(!this.courses.length){
      return this.httpClient.get(this.url).pipe(
        map((res:any) => this.courses = res)
      );
    }
    return of(this.courses);
  }

  getCourseDetail(courseId:string):Observable<Course> {
    return this.httpClient.get(this.url).pipe(
      map((res:any) => {
        const course = res.find((course:Course) => course.courseId === courseId) ?? this.courses[0];
       console.log('entering',course);
        return course;
      })
    )
  }

  deleteCourse(courseId:string):Observable<Course[]>{
    return this.httpClient.get(this.url).pipe(
      map(() => {
        // ignore the request for now. 
        return this.courses.filter((course:Course) => course.courseId != courseId)
      })
    )
  }

  editCourse(course:Course):Observable<void>{
    return this.httpClient.get(this.url).pipe(
      map(() => {
        // ignore the request for now.
        this.courses.forEach((c:Course) => {
          if(c.courseId == course.courseId){
            c.courseId = course.courseId;
            c.courseName = course.courseName;
            c.passingMarks = course.passingMarks;
            c.totalMarks = course.totalMarks;
          }
        })
        console.log(this.courses);
        
      })
    )
  }
}
