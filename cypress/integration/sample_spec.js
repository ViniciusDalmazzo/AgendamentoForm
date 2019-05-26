describe('Simple tests', () => {
    it('Should be open Agendamento', () => {
      cy.visit('/')
    }),
    it('Should be return grupos', () => {
        cy.request('http://controlequadra.herokuapp.com/api/grupo')
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
          })
          
      }),
      it('Should be return quadras', () => {
        cy.request('http://controlequadra.herokuapp.com/api/quadra')
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
          })         
      })   
  })