describe('template spec', () => {

  // Variables
  const urlSitio = 'https://the-internet.herokuapp.com/login';
  const inputUser = "input#username";
  const inputPass = "input#password";
  const labelError = "#flash.error";
  const labelSuccess = "#flash.success";
  const vacio = "";
  const usuario = "tomsmith";
  const password = "SuperSecretPassword!";
  const botonLogin = ".radius";
  const botonLogout = ".secondary";
  const msnjErrorUser = "Your username is invalid!";
  const msnjErrorPass = "Your password is invalid!";
  const msnjSuccess = "You logged into a secure area!";
 
  // Antes de cada prueba....
  beforeEach(() => {
    // Quitar los molestos mensajes xhr
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    // Visitar el sitio web
    cy.visit(urlSitio);
  });

  //1. Comprobar mensaje User y Pass vacío
  it('User y Pass Vacío', () => {
    // Paso 1: Comprobar que user y pass están vacíos
    cy.get(inputUser).should('have.value', vacio);
    cy.get(inputPass).should('have.value', vacio);
    // Paso 2: Pulsar en el botón
    cy.get(botonLogin).click();
    // Paso 3: Comprobar que el mensaje de error es el correcto
    cy.get(labelError).contains(msnjErrorUser);
  });

  //2. Comprobar mensaje User vacío y pass correcto
  it('User vacío y pass correcto', () => {
    // Paso 1: Comprobar que user está vacío
    cy.get(inputUser).should('have.value', vacio);
    // Paso 2: Añadir password
    cy.get(inputPass).type(password)
    // Paso 3: Comprobar que el password se ha añadido
    cy.get(inputPass).should('have.value', password);
    // Paso 4: Pulsar en el botón
    cy.get(botonLogin).click();
    // Paso 5: Comprobar que el mensaje de error es el correcto
    cy.get(labelError).contains(msnjErrorUser);
  });

  //3. Comprobar mensaje User vacío y pass incorrecto
  it('User vacío y pass incorrecto', () => {
    // Paso 1: Comprobar que user está vacío
    cy.get(inputUser).should('have.value', vacio);
    // Paso 2: Añadir password incorrecto
    cy.get(inputPass).type("incorrecto");
    // Paso 3: Comprobar que el password es dierente al correcto
    cy.get(inputPass).should('not.have.value', password);
    // Paso 4: Pulsar en el botón
    cy.get(botonLogin).click();
    // Paso 5: Comprobar que el mensaje de error es el correcto
    cy.get(labelError).contains(msnjErrorUser);
  });


//4. Comprobar mensaje User correcto y pass vacio
it('User correcto y pass vacío', () => {
  // Paso 1: Comprobar que pass está vacío
  cy.get(inputPass).should('have.value', vacio);
  // Paso 2: Añadir user
  cy.get(inputUser).type(usuario);
  // Paso 3: Comprobar que el user se ha añadido
  cy.get(inputUser).should('have.value', usuario);
  // Paso 4: Pulsar en el botón
  cy.get(botonLogin).click();
  // Paso 5: Comprobar que el mensaje de error es el correcto
  cy.get(labelError).contains(msnjErrorPass);
});

//6. Comprobar mensaje User incorrecto y pass correcto
it('User incorrecto y pass correcto', () => {
  // Paso 1: Añadir user incorrecto
  cy.get(inputUser).type("incorrecto");
  // Paso 2: Comprobar que el user se ha añadido
  cy.get(inputUser).should('have.value', "incorrecto");
  // Paso 3: Añadir pass correcto
  cy.get(inputPass).type(password);
  // Paso 4: Comprobar que el pass se ha añadido
  cy.get(inputPass).should('have.value', password);
  // Paso 5: Pulsar en el botón
  cy.get(botonLogin).click();
  // Paso 6: Comprobar que el mensaje de error es el correcto
  cy.get(labelError).contains(msnjErrorUser);
});


//7. Comprobar mensaje User correcto y pass incorrecto
it('User correcto y pass incorrecto', () => {
  // Paso 1: Añadir user correcto
  cy.get(inputUser).type(usuario);
  // Paso 2: Comprobar que el user se ha añadido
  cy.get(inputUser).should('have.value', usuario);
  // Paso 3: Añadir pass incorrecto
  cy.get(inputPass).type("incorrecto");
  // Paso 4: Comprobar que el pass se ha añadido
  cy.get(inputPass).should('have.value', "incorrecto");
  // Paso 5: Pulsar en el botón
  cy.get(botonLogin).click();
  // Paso 6: Comprobar que el mensaje de error es el correcto
  cy.get(labelError).contains(msnjErrorPass);
});

//8. Comprobar mensaje User correcto y pass correcto
it('User correcto y pass correcto', () => {
  // Paso 1: Añadir user correcto
  cy.get(inputUser).type(usuario);
  // Paso 2: Comprobar que el user se ha añadido
  cy.get(inputUser).should('have.value', usuario);
  // Paso 3: Añadir pass correcto
  cy.get(inputPass).type(password);
  // Paso 4: Comprobar que el pass se ha añadido
  cy.get(inputPass).should('have.value', password);
  // Paso 5: Pulsar en el botón
  cy.get(botonLogin).click();
  // Paso 6: Comprobar que el mensaje de error es el correcto
  cy.get(labelSuccess).contains(msnjSuccess);
  // Paso 7: Pulsar en el botón logout
  cy.get(botonLogout).click();
});


})
