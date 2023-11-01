describe('Logs page', () => {
  it('passes', () => {
     //Goes to logs
     cy.visit('/')
     cy.contains("Logs").click()
     cy.url().should('include', '/logs')
 
     //checks for table headers
     cy.contains("Log ID")
     cy.contains("Description")
     cy.contains("Date")
     cy.contains("Device Info")

     //toggles the Log ID
     cy.contains('Log ID').click();
  })
})