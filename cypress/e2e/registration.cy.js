/// <reference types='cypress' />

describe('Student Registration page', () => {
  let user;

  before(() => {
    cy.visit('/') ;
    cy.task('generateUser')
      .then(generateUser =>{
        user = generateUser;

      })     
  });

  it('should register a new student', () => {
    
    cy.get('#firstName')
      .type(user.firstName); 
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.contains('.custom-control-label', user.gender)
      .click();   
    cy.get('#userNumber')
      .type(user.mobileNumber);
    cy.get('#dateOfBirthInput')
      .type('{selectall} 23 Feb 2000' + '{enter}');
    cy.get('.subjects-auto-complete__value-container')
      .type(user.subjects + '{enter}');
    cy.contains('.custom-control-label', user.hobbies)
      .click();
    cy.get('#currentAddress')
      .type(user.address);
    cy.contains('Select State')
      .type('{downArrow}{enter}');
     cy.contains('Select City')
      .type('{downArrow}{enter}');
    cy.get('#submit')
      .click({force : true});
    cy.contains('tr', 'Student Name')
      .should('contain', user.firstName)
      .and('contain', user.lastName);
  });
});
