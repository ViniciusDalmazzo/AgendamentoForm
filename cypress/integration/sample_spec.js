describe('Simple tests', () => {
    it('Should be open Agendamento', () => {
      cy.visit('/')
    }),
    it('Should be return groups', () => {
        cy.request('http://controlequadra.herokuapp.com/api/grupo')
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
          })
          
      })
  })