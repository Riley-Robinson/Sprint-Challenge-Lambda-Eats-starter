describe("Testing the pizza pizza", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    });
    it("Add test to inputs and submit form", function() {
      cy
      .get('button[name="orderbutton"]')
      .click()
      cy
      .get('input[name="name"]')
      .type("Riley")
      .should("have.value", "Riley")
      cy
      .get('textarea[name="specInstr"]')
      .type("some text")
      .should("have.value", "some text")
      cy
      .get('select[name="size"]')
      .select('Sm')
      .should("have.value", "Sm")
      cy
      .get('[type=checkbox]')
      .check()
      .should("be.checked")
      cy
      .get('button[name="submit"]')
      .click()
    });

    it("No toppings no instructions", function() {
        cy
        .get('button[name="orderbutton"]')
        .click()
        cy
        .get('button[name="homebutton"]')
        .click()
        cy
        .get('button[name="orderbutton"]')
        .click()
        cy
        .get('input[name="name"]')
        .type("Mimi")
        .should("have.value", "Mimi")
        cy
        .get('select[name="size"]')
        .select('Sm')
        .should("have.value", "Sm")
        cy
        .get('button[name="submit"]')
        .click()

      });
  }); 