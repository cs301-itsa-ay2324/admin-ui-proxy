describe('Users page', () => {
  it('passes', () => {
    //Goes to users page
    cy.visit('/')
    cy.contains("Users").click()
    cy.url().should('include', '/users')

    //checks for table headers
    cy.contains("User ID")
    cy.contains("Name")
    cy.contains("Email")
    cy.contains("Points Balance")
    cy.contains("Role")
    cy.contains("Actions").scrollIntoView()

    //Checks Add User Page
    cy.contains("New User").click()
    cy.url().should('include', '/enrol')
    cy.contains("First Name")
    cy.contains("Last Name")
    cy.contains("Email")
    cy.contains("Role")


    //Checks for the user with the name Waltraud Ondricka
      // cy.contains("da7da4ff-f10c-4b89-ab64-ea7263f6b624")
      // cy.contains("Waltraud Ondricka")
      // cy.contains("waltraud_ondricka@oreilly.org").click()
      // cy.contains("5130")

    //Edits the user
      // cy.contains("Edit").click()
      // cy.contains("Search role...")
      // cy.contains("Manager")
      // cy.contains("Engineer")
      // cy.contains("Product Owner")
      // cy.contains("Owner").click()

    //Back to users
      // cy.contains("Users").click()
      // cy.contains("Adjust Points")
      // cy.get('input[name=balance]').type('1000')
      // cy.contains("Submit").click()

  })
})