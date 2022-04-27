describe('Practice web controls using cypress',() => {
    beforeEach(() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })
    
    // How to find dynamically column of the table and then use next() method to get the sibling. 
    it('should check info inside table',() => {
        cy.get('tr td:nth-child(2)').each((item,idx) => {
            const text = item.text();
            if(text.includes('Python')){
                cy.get('tr td:nth-child(2)').eq(idx).next().should('have.text',25);
            }
        })
    })
})