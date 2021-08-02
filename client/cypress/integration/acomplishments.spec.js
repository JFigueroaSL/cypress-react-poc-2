/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('accomplishments', () => {
  beforeEach(() => {
    cy.visit('/accomplishments');
  });

  it('Should display inappropiate content error when text is unaccepted', () => {
    const title = 'Testing the server';
    const accomplishment = 'Testing a giraffe 🦒';
    cy.get("input[placeholder='Title']").type(title);
    cy.get("[class='Accomplishment-textarea']").type(accomplishment);
    cy.get("[data-cy='accomplishment-checkbox']").check();
    cy.contains('button', 'Submit Accomplishment').click();
    cy.contains('Your content is not appropriate').should('be.visible');
  });

  it('Should display inappropiate content error with mock', () => {
    cy.intercept('POST', 'http://localhost:4000', (req) => {
      req.reply((res) => {
        res.send({
          msg: 'Your content is not appropriate',
        });
      });
    });
    const title = 'Testing the server';
    const accomplishment = 'Testing a giraffe 🦒';
    cy.get("input[placeholder='Title']").type(title);
    cy.get("[class='Accomplishment-textarea']").type(accomplishment);
    cy.get("[data-cy='accomplishment-checkbox']").check();
    cy.contains('button', 'Submit Accomplishment').click();
    cy.contains('Your content is not appropriate').should('be.visible');
  });
});
