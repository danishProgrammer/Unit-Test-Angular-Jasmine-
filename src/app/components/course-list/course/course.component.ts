import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/utils/course.utils';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor() { }  
  @Input() course!:Course;
  @Output() delete:EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  public deleteCourse():void{
   if(confirm('Are you sure you want to delete this course'))
     this.delete.emit(true);
   
  }
}
