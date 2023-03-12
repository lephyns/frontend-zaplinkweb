// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Screenshot.defaults({ //Desabilita o screenshot quando o teste falha
    screenshotOnRunFailure: false
})

afterEach(() => { //Função que se comporta como "gancho" que é executado toda vez que um teste termina
    cy.screenshot()
})

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test) => { //Evento de listen do cypress, assim que o cypress terminar a execução de cada teste, será interceptado a execução 
    
    const shotFileName = `${test.title} -- after each hook.png` //Pega o nome do screenshot
    addContext({test}, `assets/screenshots/${Cypress.spec.name}/${shotFileName}`) //E adiciona no relatório através do caminho relativo
})