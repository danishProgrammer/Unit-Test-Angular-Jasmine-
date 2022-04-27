import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/utils/course.utils';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  courseList:any;

  constructor(private activatedRoute:ActivatedRoute,private courseService:CourseService,private router:Router) { }
  public newCourse:boolean = false;
  public course!:Course;
  public courseForm!:FormGroup;

  ngOnInit(): void {
    this.newCourse = this.activatedRoute.snapshot.data['new'] ?? this.newCourse;
    if(!this.newCourse){
      this.fetchCourseDetail();
    }
    this.configureForm()
  }
  public submitCourse():void{
    if(!this.newCourse){
      this.editCourse();
    }
    else{
      this.addCourse();
    }
  }
  public addCourse():void{
    

    this.courseService.getCourseList().subscribe(courses => {
      const len = courses.length;
      const course:Course = {
        courseId: ""+len,
        courseName:this.courseForm.get('courseName')?.value,
        passingMarks:this.courseForm.get('passingMarks')?.value,
        totalMarks:this.courseForm.get('totalMarks')?.value
      }
      console.log(course);
      
      this.courseService.addCourse(course).subscribe(() => {
        alert('course Added successfully')
        setTimeout(() => {
          this.router.navigate(['/']);
        },1000)
      })
    })
    
    
  }
  public editCourse(): void {
    const course:Course = {
      courseId: this.course.courseId ,
      courseName:this.courseForm.get('courseName')?.value,
      passingMarks:this.courseForm.get('passingMarks')?.value,
      totalMarks:this.courseForm.get('totalMarks')?.value
    }
    this.courseService.editCourse(course).subscribe(() => {
      alert('course edited successfully')
      setTimeout(() => {
        this.router.navigate(['/']);
      },1000)
    })
  }

  

  public cancelForm():void{
    this.router.navigate(['/']);
  }

  private fetchCourseDetail():void{
    const courseId = this.activatedRoute.snapshot.params.id;
   this.courseService.getCourseDetail(courseId).subscribe((course:Course) => {
    this.course = course;
    this.configureForm();
   })   
  }

  private configureForm():void{
    this.courseForm = new FormGroup({
      // 'courseId':new FormControl(this.course?.courseId ?? null),
      'courseName':new FormControl(this.course?.courseName ?? null,[Validators.required]),
      'passingMarks':new FormControl(this.course?.passingMarks ?? null,[Validators.required]),
      'totalMarks':new FormControl(this.course?.totalMarks ?? null,[Validators.required])
    })
  }
}
