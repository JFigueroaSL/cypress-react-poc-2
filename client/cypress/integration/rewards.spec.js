/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('rewards', () => {
  beforeEach(() => {
    cy.visit('/rewards');
  });

  it.only('Should display a list of rewards', () => {
    cy.get('ul')
      .should('contain', '500 points for drinking 8 cups of water for 7 straight days')
      .and('contain', '850 points for fasting for 5 days straight');
  });

  //Mocking data
  it.only('Should display a list of rewards with mock', () => {
    cy.intercept('GET', 'http://localhost:4000/rewards', { fixture: 'rewards.json' }).as('getRewards');
    cy.get('ul')
      .should('contain', '500 points for drinking 8 cups of water for 7 straight days')
      .and('contain', '850 points for fasting for 5 days straight');
  });
});
