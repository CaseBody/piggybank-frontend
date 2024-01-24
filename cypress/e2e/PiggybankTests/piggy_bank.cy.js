/// <reference types="cypress" />

describe("piggybank", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit("http://localhost:3000");
	});

	it("Change display name", () => {
		cy.LoginAsSophie();
		cy.visit("http://localhost:3000/settings");

		cy.get(".accountName-input").clear().type("Nieuwe Naam");
		cy.get("form").submit();

		cy.visit("http://localhost:3000/settings");

		cy.get(".accountName-input").should("have.text", "Nieuwe Naam");
	});

	it("Maak een overboeking", () => {
		cy.LoginAsSophie();
		cy.visit("http://localhost:3000/transfer");

		cy.get("select[name='toaccount']").select("1");

		cy.get(".amount-input").clear().type("50");
		cy.get("textarea[name='description']").clear().type("test overboekingen");
		cy.get("form").submit();
		cy.visit("http://localhost:3000/transactions");
		cy.get(".amount-credit").first().should("have.text", "€ -50");
	});

	it("Maak een overboeking in vreemde valuta", () => {
		cy.LoginAsSophie();
		cy.visit("http://localhost:3000/transfer");

		cy.get("select[name='toaccount']").select("1");
		cy.get("select[name='currency']").select("USD");

		cy.get(".amount-input").clear().type("50");
		cy.get("textarea[name='description']").clear().type("test overboekingen");
		cy.get("form").submit();
		cy.visit("http://localhost:3000/transactions");
		cy.get(".amount-credit").first().should("have.text", "€ -45.45");
	});
});

Cypress.Commands.add("LoginAsMelvin", () => {
	cy.visit("http://localhost:3000/login");
	cy.contains(".login__account", "Melvin").click();
	cy.contains(".accounts__account-name", "Melvin").click();
});

Cypress.Commands.add("LoginAsSophie", () => {
	cy.visit("http://localhost:3000/login");
	cy.contains(".login__account", "Sophie").click();
	cy.contains(".accounts__account-name", "Sophie").click();
});
