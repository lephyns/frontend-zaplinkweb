describe('Busca', () => {

    const user = {
        email: 'joao@gmail.com',
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
        name: 'Yuri Silva',
        number: '48996561407',
        description: 'Aulas de piano'
    }

    context(`Dado que eu tenho o seguinte contato ${contact.name}`, () => {
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

        it('Quando faço a busca deste contato', () => {
            cy.dash()
            cy.searchContact(contact.number)
            // cy.get('#loader', {timeout: 5000}).should('not.visible')
        })

        it('Devo ver somente este contato no dashboard', () => {
            cy.contactItem().should('have.length', 1)
            cy.contactItem().contains(contact.name)
            cy.contactItem().contains(contact.description)
        })
    })

    context('Quando busco por um contato não cadastrado', () => {
        before(() => {
            cy.dash()
            cy.searchContact('48996561420')
            // cy.get('#loader', {timeout: 5000}).should('not.visible')
        })

        it('Deve retornar mensagem de alerta', () => {
            cy.get('.message-body').contains('Contato não encontrado :(')
        })
    })
})