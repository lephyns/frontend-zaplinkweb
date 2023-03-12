Cypress.Commands.add("dash", () => { 
    cy.visit('/dashboard')
})

Cypress.Commands.add("createContact", (contact) => { 
    cy.get('#addNewContact').click()
    
    if (contact.name) 
    cy.get('.input-full-name > .input').type(contact.name)

    if (contact.number) 
    cy.get('.input-number input').type(contact.number)

    if (contact.description) 
    cy.get('.text-description textarea').type(contact.description)

    cy.get('#saveButton').click()
})

Cypress.Commands.add("searchContact", (number) => {
    cy.get('.level-right input').type(number)
    cy.get(':nth-child(2) > .button').click()
})

Cypress.Commands.add("contactList", () => { 
    return cy.get('.contact-list')
})

Cypress.Commands.add("contactItem", () => { 
    return cy.get('.card')
})

Cypress.Commands.add("getContact", (target) => { 
    return cy.contains('.card', target)
})

Cypress.Commands.add("removeContact", (target) => { 
    cy.getContact(target).find('.btn-remove').click()
})

Cypress.Commands.add("alertName", () => { 
    return cy.get('.input-full-name small')
})

Cypress.Commands.add("alertNumber", () => { 
    return cy.get('.input-number small')
})

Cypress.Commands.add("alertDesc", () => { 
    return cy.get('.text-description small')
})

// Custom actions
// O Cypress sabe que este comando existe porque ele está tenso importado no arquivo `index.js`
// Adicionado o if que tem o papel de questionar se existe a informação. Em caso positivo ele executa o comando de preenchimento
// Se tiver a massa de teste preenche, se não ele não irá preencher
// Aqui não fazemos validação!