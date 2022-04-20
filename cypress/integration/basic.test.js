import "cypress-real-events/support";

describe("basic comp", () => {
  beforeEach(() => {
    cy.fixture("course.json").as("courseJSON");
    cy.server();
    cy.route("http://localhost:4200/assets/courses.json", "@courseJSON").as(
      "course"
    );
    cy.visit("/");
  });

  it("should display All courses", () => {
    cy.contains("Welcome to Angular Unit Testing Practice Course");
    cy.wait("@course");
    cy.get("@course").then((res) => {
      const courses = res.response.body;
      cy.get("app-course").should("have.length", courses.length);
    });
  });

  it("should type and show result", () => {
    const searchKey = "Maths";
    cy.get(".search").should("have.length", 1);
    cy.get(".search").type(searchKey);
    cy.get("@course").then((res) => {
      const courses = res.response.body;
      const filteredCourses = courses.filter((course) =>
        course.courseName.includes(searchKey)
      );
      cy.get("app-course").should("have.length", filteredCourses.length);
    });
  });

  it("should click edit , navigate to edit and add data and save", () => {
    cy.get(".edit").first().click({ force: true });
    cy.contains("Course Name");
    cy.contains("Passing Marks");
    cy.contains("Total Marks");
    cy.url().should("include", "/1/edit");
    cy.get("#courseName").clear().type("Maths");
    cy.get("#passingMarks").clear().type("40");
    cy.get("#totalMarks").clear().type("100");
    cy.get(".submit").click();
  });

  it("should Add course", () => {
    cy.visit("/new-course");
    cy.contains("Course Name");
    cy.contains("Passing Marks");
    cy.get("#courseName").type("EVS");
    cy.get("#passingMarks").type("60");
    cy.get("#totalMarks").type("100");
    cy.get(".submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("course Added successfully");
    });
  });

  it("should open Add course", () => {
    cy.get(".addCourse").should("have.length", 1);
    cy.get(".addCourse").first().click();
    cy.url().should("include", "/new-course");
    cy.contains("Course Name");
    cy.contains("Passing Marks");
    cy.contains("Total Marks");
  });

  it("should contain edit and delete button on hover", () => {
    cy.get(".course").eq(2).as("thirdEl");
    cy.get("@thirdEl")
      .realHover()
      .should("have.css", "background-color", "rgb(39, 75, 5)");
    cy.get("@thirdEl").realHover().contains("Edit");
    cy.get("@thirdEl")
      .realHover()
      .find(".course-actions .btn")
      .should("have.length", 2);
    cy.get("@thirdEl")
      .trigger("mouseover")
      .find(".course-actions")
      .invoke("show")
      .contains("Edit")
      .click();
  });

<<<<<<< HEAD
    it('should open Add course',()=>{
        cy.get(".addCourse").should("have.length",1)
        cy.get(".addCourse").first().click()
        cy.url().should('include', '/new-course') 
        cy.contains("Course Name")
        cy.contains("Passing Marks")
        cy.contains("Total Marks")
   })
   it('should match page heading',()=>{
    cy.get(".pageHeading").should('have.text',"Welcome to Angular Unit Testing Practice Course")

})
})
=======
  it("should open confirm dialog when delete clicked", () => {
    cy.get(".course").eq(1).as("secondEle");
    cy.wait(2000);
    cy.get("@secondEle")
      .trigger("mouseover")
      .find(".course-actions")
      .invoke("show")
      .contains("Delete")
      .click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you sure you want to delete this course");
    });
  });
});
>>>>>>> 9a1e0c656bcd8cd46926997b6adbc63ac525fd77
