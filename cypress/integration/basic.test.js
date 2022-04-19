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
        cy.url().should('include', '/new-course') 
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
   
   it('change color on hover',()=>{
    //cy.get('.course:hover').first().trigger('mouseup').should('have.css', 'background-color', 'rgba(39, 75, 5)');
    // cy.wait(10000)
    // .should('have.css', 'background-color', '-rgb(39, 75, 5)');
    //cy.get('.course').first().trigger('mouseup').should('have.css', 'background-color', 'rgb(39, 75, 5)');
    
    // cy.get('.course').first().trigger('hold')
    // cy.get('.course:hover').first()
    // .should('have.css', 'background-color', 'rgb(39, 75, 5)');
})



it('click edit , navigate to edit ', ()=>{
    cy.get(".edit").first().click({ force: true })
    cy.contains("Course Name")
        cy.contains("Passing Marks")
        cy.contains("Total Marks")
        cy.url().should('include', '/1/edit') 
})

})