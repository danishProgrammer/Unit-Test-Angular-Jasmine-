import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseService } from '../../services/course.service';

import { CourseListComponent } from './course-list.component';


describe('CoursesComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      imports:[HttpClientTestingModule],
      providers:[CourseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add course on button click',() => {
      const fixture = TestBed.createComponent(CourseListComponent);
      const courseComp = fixture.componentInstance;
  })
});
