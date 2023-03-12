describe('Remover contato', () => {

    const user = {
        email: 'maria@yahoo.com',
        password: 'qa@123'
    }

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json'},
            body: user, //Payload
            failOnStatusCode: false //Não se preocupa com o status code
        }).then((response) => { //Porque o request é uma promessa
            cy.log(JSON.stringify(response.body)) //Funcionalidade do cypress que exibe o log no teste
        })

        cy.doLogin(user.email, user.password) //Faz login através o custom commands
        cy.get('.dashboard', {timeout: 5000}).should('be.visible') //Espera 5s após fazer o login para pagantir que está no dashboard
    })

    const contact = {
        name: 'Lucas Silva',
        number: '48996561447',
        description: 'Aulas de natação'
    }

    context(`Dado que ${contact.name} é um contato indesejado`, () => {
        before(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user_token')
            },
                body: contact,
                failOnStatusCode: false //Não se preocupa com o status code
            }).then((response) => { //Porque o request é uma promessa
                cy.log(JSON.stringify(response.body)) //Funcionalidade do cypress que exibe o log no teste
            })
        })

        it('Quando apago este contato', () => {
            cy.dash()
            cy.removeContact(contact.number)
        })

        it('Não deve ser exibido no dashboard', () => {
            cy.searchContact(contact.number)
            cy.get('.message-body').contains('Contato não encontrado :(')
        })
    })
})