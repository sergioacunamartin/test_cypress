describe('template spec', () => {
  // Variables
  const urlSitio = 'https://the-internet.herokuapp.com/shifting_content/menu';
 
  // Antes de cada prueba....
  beforeEach(() => {
    // Quitar los molestos mensajes xhr
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    // Visitar el sitio web
    cy.visit(urlSitio);
  });

  // 
  it('Cuenta el número de elementos li', () => {
    cy.get('body ul')
      .find('li')
      .then(($li) => {
        const count = $li.length;
        cy.log(`Número de <li>: ${count}`);
      });
  });

});