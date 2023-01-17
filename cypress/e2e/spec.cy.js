describe('Burrito Builder User Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      "orders": [
        {
          "id": 1,
          "name": "Hailey",
          "ingredients": ["hot sauce", "sour cream"]
        }
      ]
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      "id": 2,
      "name": "Alex",
      "ingredients": ["cilantro", "beans"],
    })
    cy.visit('http://localhost:3000/')
  })
  it('Should see a title', () => {
    cy.get('h1').should('contain', 'Burrito Builder')
  })

  it('Should see existing order', () => {
    cy.get('.order').within(() => {
      cy.get('h3').should('contain', 'Hailey')
      cy.get('li').eq(0).should('contain', 'hot sauce')
      cy.get('li').eq(1).should('contain', 'sour cream')
    })
  })

  it('Should see the burrito making form', () => {
    cy.get('form').within(() => {
      cy.get('input[placeholder="Name"]').should('have.value', '')
      cy.get('button[name="beans"]').should('contain', 'beans')
      cy.get('button').eq(-1).should('contain', 'Submit Order')
      cy.get('button').should('have.length', 13)
      cy.get('p').should('contain', 'Order: Nothing selected')
    })
  })

  it('Should be able to fill out the form', () => {
    cy.get('form').within(() => {
      cy.get('input[placeholder="Name"]').type('Alex').should('have.value', 'Alex')
      cy.get('button[name="beans"]').should('contain', 'beans').click()
      cy.get('button[name="cilantro"]').should('contain', 'cilantro').click()
      cy.get('p').should('contain', 'Order: beans, cilantro')
    })
  })

  it('Should be able to submit a burrito order', () => {
    cy.get('form').within(() => {
      cy.get('input[placeholder="Name"]').type('Nonsense')
      cy.get('button[name="beans"]').click()
      cy.get('button[name="cilantro"]').click()
    })
    cy.get('.order').should('have.length', 1)
    cy.get('button').eq(-1).click()
    cy.get('.order').should('have.length', 2)
    cy.get('.order').eq(1).within(() => {
      cy.get('h3').should('contain', 'Alex')
      cy.get('li').eq(0).should('contain', 'cilantro')
      cy.get('li').eq(1).should('contain', 'beans')
    })
  })
})