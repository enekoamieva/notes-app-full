/*  */

describe('Note App', () => {

    //Antes de cada test que visite la pagina
    beforeEach(() => {
        cy.visit('http://localhost:3000');

        //Realizamos una peticion para que borre todos los datos de la BD de test
        cy.request('POST', 'http://localhost:8080/api/testing/reset');

        //Creamos un usuario de pruebas
        const demoUser = {
            "username": "cypress",
            "name": "Cypress Testing",
            "password": "12345"
        };

        cy.request('POST', 'http://localhost:8080/api/users', demoUser);
    });

    it('frontpage se puede abrir', () => {
        cy.contains('Notes App');
    });

    it('abrir login form', () => {
        cy.contains('Mostrar login').click();
    });

    it('abrir login form y ver si hace un intento de sesión fallida', () => {
        cy.contains('Mostrar login').click();
        cy.get('input:first').type('enekoa');
        cy.get('input:last').type('12345');
        cy.get('#login-form-button').click();
        cy.get('.notification-error').contains('Credenciales inválidas');
    });

    describe('cuando el usuario ha iniciado sesión', () => {
        beforeEach(() => {
            cy.contains('Mostrar login').click();
            cy.get('input:first').type('cypress');
            cy.get('input:last').type('12345');
            cy.get('#login-form-button').click();
        });

        it('crear una nota', () => {
            cy.contains('Nueva Nota').click();
            cy.get('input').type('Crear una nota desde el testing de Cypress');
            cy.get('#form-submit-note-button').click();
            cy.contains('Crear una nota desde el testing de Cypress');
        });

    });

});