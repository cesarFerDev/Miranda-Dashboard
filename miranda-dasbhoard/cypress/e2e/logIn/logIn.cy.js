
describe("Log In page funcionality tests", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("Trying to access the dashboard without being logged", () => {
        cy.get('[data-cy="logout__button"]').should('not.exist');
        cy.wait(500)
    });
    it("Trying to access the dashboard with invalid credentials", () => {
        cy.get('[data-cy="login__usermail__input"]').type("xxxxx@mail.com");
        cy.get('[data-cy="login__userpass__input"]').type("111111");
        cy.get('[data-cy="login__submit__button"]').click();
        cy.get('[data-cy="logout__button"]').should('not.exist');
        cy.visit("http://localhost:3000/");
        cy.get('[data-cy="login__submit__button"]').should('not.exist');
        cy.wait(500)
        
    });
    it("Trying to access the dashboard with valid credentials", () => {
        cy.get('[data-cy="login__usermail__input"]').type("jekkproducer@gmail.com");
        cy.get('[data-cy="login__userpass__input"]').type("1234");
        cy.get('[data-cy="login__submit__button"]').click();
        cy.get('[data-cy="logout__button"]').should('exist');
        cy.wait(500)
    });
    it("Testing the logout button", () => {
        cy.get('[data-cy="login__usermail__input"]').type("jekkproducer@gmail.com");
        cy.get('[data-cy="login__userpass__input"]').type("1234");
        cy.get('[data-cy="login__submit__button"]').click();
        cy.get('[data-cy="logout__button"]').should('exist');
        cy.get('[data-cy="logout__button"]').click();
        cy.get('[data-cy="logout__button"]').should('not.exist');
        cy.wait(500)
    });
});