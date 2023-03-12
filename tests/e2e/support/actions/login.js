Cypress.Commands.add("doLogin", (email, password) => { 
    cy.visit('/')
    if (email) cy.get('input[name=email]').type(email) //Se tiver o e-mail irá preencher o e-mail
    if (password) cy.get('input[name=password]').type(password) 
    cy.get('#sigIn').click()
})

Cypress.Commands.add("loginAlert", (target) => { 
    return cy.contains('.message-body', target)
})

// Custom actions
// O Cypress sabe que este comando existe porque ele está tenso importado no arquivo `index.js`
// Adicionado o if que tem o papel de questionar se existe a informação. Em caso positivo ele executa o comando de preenchimento
// Se tiver a massa de teste preenche, se não ele não irá preencher
// Aqui não fazemos validação!