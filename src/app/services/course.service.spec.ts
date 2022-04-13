import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../utils/course.utils';

describe('CourseService', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;
  let courseList:Course[] = [{
    courseId:'mock-1',
    courseName:'mock-name',
    passingMarks:40,
    totalMarks:100
  },
  {
    courseId:'mocked-00',
    courseName:'mock-name',
    passingMarks:50,
    totalMarks:100
  }]
  const mockUrl:string = `../.././assets/courses.json`;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CourseService]
    });
    courseService = TestBed.get(CourseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should get course list',() => {
    courseService.getCourseList().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(courseList);
    })
    const request = httpMock.expectOne(mockUrl);
    expect(request.request.method).toBe('GET');
    request.flush(courseList);
  })

  it('should return courseDetail',()=>{
    let course:Course = {
      courseId:'mocked-00',
      courseName:'mock-name',
      passingMarks:50,
      totalMarks:100
    }
    courseService.getCourseDetail(course.courseId).subscribe(courseInfo =>{
      console.log(courseInfo);
      expect(courseInfo).toBeDefined();
      expect(courseInfo).toEqual(course);
    })
    const request = httpMock.expectOne(mockUrl);
    expect(request.request.method).toBe('GET');
    request.flush(courseList);
  })

  afterEach(() => {
    httpMock.verify();
  })
});
