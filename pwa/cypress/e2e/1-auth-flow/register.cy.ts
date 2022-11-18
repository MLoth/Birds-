describe('Register test', () => {
  it('Should register and be redirected to home page', () => {
    cy.visit(`${Cypress.env('APP_URL')}/auth/register`)

    cy.get('[data-cy=name]').type(Cypress.env('NAME'))
    cy.get('[data-cy=email]').type(Cypress.env('EMAIL'))
    cy.get('[data-cy=password]').type(Cypress.env('PASSWORD'))

    // click the login form button
    cy.get('[data-cy=register]').click()

    // assert that the navbar change from login to logout
    cy.get('[data-cy=username]').should('contain', 'Edward Hopper')

    // assert that we are redirected to the home page
    cy.url().then((url) => {
      cy.url().should('contain', '/')
    })
  })
})
