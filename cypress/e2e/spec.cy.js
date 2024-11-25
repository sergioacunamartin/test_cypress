describe('template spec', () => {

  // Variables
  const urlSitio = 'https://todomvc.com/examples/react/dist';
  const selectorInput = '.new-todo';
  const selectorItem = '.todo-list li';
  const checkButton = '.toggle';
  const inputContainer = "ul.todo-list li input";
  const botonEliminar = "button.destroy"
  let nombreTarea = "";
  const tareas = ['Ir a correr', 'Lavar los platos', 'Sacar la basura', 'Bañar al perror'];
  const filtroCompletadas = 'ul.filters li:nth-child(3) a';
  const filtroNoCompletadas = 'ul.filters li:nth-child(2) a';
  const filtroTodas = 'ul.filters li:nth-child(1) a';
 
  // Antes de cada prueba realiza la visita al sitio
  beforeEach(() => {
    cy.visit(urlSitio);
  });

  //1. Crear Tarea
  it('Crear Tarea', () => {
    // Paso 1: Ingresar tarea y pulsar enter
    nombreTarea = tareas[0];
    cy.get(selectorInput).type(nombreTarea + '{enter}'); 
    // Paso 2: Verificamos que esa tarea se ha agregado
    cy.get(selectorItem).should('have.text', nombreTarea)
  });

  //2. Crear Tarea
  it('Marcar tarea como completada', () => {
    // Paso 1: Ingresar tarea y pulsar enter
    nombreTarea = tareas[1];
    cy.get(selectorInput).type(nombreTarea + '{enter}'); 
    // Paso 2: Marcamos la tarea
    cy.get(checkButton).check()
    // Paso 3: Verificar que la tarea está marcada
    cy.get(checkButton).should('be.checked');
  });

  //3. Desmarcar tarea completada
  it('Desmarcar tarea completada', () => {
    // Paso 1: Ingresar tarea y pulsar enter
    nombreTarea = tareas[2];
    cy.get(selectorInput).type(nombreTarea + '{enter}'); 
    // Paso 2: Marcamos la tarea y comprobamos si relamente se marcó
    cy.get(checkButton).check()
    cy.get(checkButton).should('be.checked');
    // Paso 4: Desmarcar tarea y comprobar que se desmarcó
    cy.get(checkButton).uncheck()
    cy.get(checkButton).should('not.be.checked');
  });

  //4. Editar tarea
  it('Editar tarea', () => {
    // Paso 1: Ingresar tarea y pulsar enter
    nombreTarea = tareas[0];
    cy.get(selectorInput).type(nombreTarea + '{enter}');
    // Paso 2: Doble click, editar tarea, borrar y añadir la nueva
    cy.get(selectorItem).dblclick();
    nombreTarea = tareas[1];
    cy.get(inputContainer)
      .clear()
      .type(nombreTarea + '{enter}'); 
  });

  //5. Eliminar una tarea
  it('Eliminar una tarea', () => {
    // Paso 1: Ingresar tarea y pulsar enter
    nombreTarea = tareas[2];
    cy.get(selectorInput).type(nombreTarea + '{enter}');
    // Paso 2: Fuerza a poner visible el elemento botonEliminar y lo pulsa
    cy.get(botonEliminar)
      .invoke('css', 'display', 'block') // Hacerlo visible
      .should('be.visible') // Verificar que ahora es visible
      .click(); // Hacer clic en el botón
  });


   //6. Filtrar Tareas
   it('Filtrar Tareas', () => {
    // Paso 1: Ingresar varias
    // Iterar sobre el array y agregar cada tarea
    tareas.forEach((nombreTarea, index) => {
      cy.get(selectorInput).type(nombreTarea + '{enter}');
      // Paso 2: Verifica que la tarea ha sido ingresada
      cy.get(selectorItem).eq(index).should('be.visible');
      cy.get(selectorItem).eq(index).should('have.text', nombreTarea);
      if (index < 2) {
        // Paso 3: Marca las tareas 1 y 2 como completadas y comprueba que sea así.
        cy.get(checkButton).check();
        cy.get(checkButton).eq(index).should('be.checked');
        cy.get(selectorItem).eq(index).should('have.class', 'completed');
        // Paso 4: Comprueba que las tareas 3 y 4 no están marcadas como completadas.
      } else {
        cy.get(checkButton).eq(index).should('not.be.checked');
        cy.get(selectorItem).eq(index).should('not.have.class', 'completed');
      }
    });
    // Paso 5: Pulsamos en filtro completadas y compruebas que se ha pulsado bien y que las tareas de las lista corresponden.
    cy.get(filtroCompletadas).click();
    cy.get(filtroCompletadas).should('have.class', 'selected');
    cy.get(selectorItem).should('have.class', 'completed');

    //Paso 6: Igual que el paso anterior pero con el filtro de tareas activas
    cy.get(filtroNoCompletadas).click();
    cy.get(filtroNoCompletadas).should('have.class', 'selected');
    cy.get(selectorItem).should('not.have.class', 'completed');

    //Paso 7: Pulsar el botón Todos
    cy.get(filtroTodas).click();
    cy.get(filtroTodas).should('have.class', 'selected');
  });
})
