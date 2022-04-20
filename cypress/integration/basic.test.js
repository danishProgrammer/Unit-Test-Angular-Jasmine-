import "cypress-real-events/support";

describe('basic comp',()=>{
    beforeEach(()=>{
        cy.fixture('course.json').as('courseJSON');
        cy.server();
        cy.route('http://localhost:4200/assets/courses.json','@courseJSON').as('course')
        cy.visit("/");
    })
    it("should display All cources",()=>{
        
        cy.contains("Welcome to Angular Unit Testing Practice Course")
        cy.wait('@course')
        cy.get('@course').then((res)=>{
            const courses  = res.response.body;
            cy.get("app-course").should("have.length",courses.length);
           
            console.log(courses.filter(course => course.courseName.includes('Maths')));
        })
        
    })
    it('should open Add course',()=>{
         cy.get(".addCourse").should("have.length",1)
         cy.get(".addCourse").first().click()
         cy.contains("Course Name")
        //   cy.get(".form-group #courseId").type("11")
        //  cy.get(".courseName").type("EVS")
        //  cy.get(".courseMarks").type("60")
        //  cy.get(".courseTotalMarks").type("100")
        // cy.get(".task").should("contain","This is task page.")
    })
    it('should type and show result',()=>{
        cy.get(".search").should("have.length",1);
        cy.get(".search").type("Maths");
        cy.get('@course').then((res)=>{
        const courses  = res.response.body;
        cy.get("app-course").should("have.length",courses.filter(course => course.courseName.includes('Maths')).length);
    });
});

    it('should contain edit and delete button on hover', ()=>{
        cy.get('.course').eq(3).as('thirdEl');
        cy.get('@thirdEl').realHover().should('have.css', 'background-color', 'rgb(39, 75, 5)');
        cy.get('@thirdEl').realHover().contains('Edit');
        cy.get('@thirdEl').realHover().find('.course-actions .btn').should('have.length', 2);
        cy.wait(3000);
        // cy.get('@thirdEl').realHover().find('.course-actions:visible .btn').contains('Edit').click();
    });
})
