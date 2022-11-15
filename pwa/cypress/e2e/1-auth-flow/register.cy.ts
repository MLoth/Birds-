describe('go to register', () => {
  it('should find register', () => {
    cy.visit('http://localhost:5173/auth/register')
    cy.get('h2').contains('Register')
    // i18n?

    // firebase?
    // graphql -> custom user...
    // apollo
  })
})
