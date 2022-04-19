describe('basic comp',()=>{
    beforeEach(()=>{
        cy.fixture('course.json').as('courseJSON')
        cy.server()
        cy.route('http://localhost:4200/assets/courses.json','@courseJSON').as('course')
        cy.visit("/");
    })
    it("should display All cources",()=>{
        // expect(true).to.equal(false)
        cy.contains("Welcome to Angular Unit Testing Practice Course")
        cy.wait('@course')
        cy.log('created new user')
        cy.get('@course').then((courses)=>{
            cy.get("app-course").should("have.length",Object.keys(courses).length)
            cy.log(courses);
        })
        
    })
    
    it('should type and show result',()=>{
        cy.get(".search").should("have.length",1)
        cy.get(".search").type("Maths")
        
        cy.get("app-course").should("have.length",1)
    })
    it('should open Add course',()=>{
        cy.get(".addCourse").should("have.length",1)
        cy.get(".addCourse").first().click()
        cy.contains("Course Name")
        cy.contains("Passing Marks")
        cy.contains("Total Marks")
   })
   it('should Add course',()=>{
    cy.visit("/new-course");
    
    cy.contains("Course Name")
    cy.contains("Passing Marks")
    cy.get("#courseName").type("EVS")
    cy.get("#passingMarks").type("60")
    cy.get("#totalMarks").type("100")
    cy.get('.submit').click()
   })
   
//    it('should change color on hover',()=>{
//     cy.get('app-course').first().trigger('mouseover')
//    })
})