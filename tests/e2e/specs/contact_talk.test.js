describe('Conversar', () => {

    const user = {
        email: 'maria@gmail.com',
        password: 'qa@123'
    }

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('user_token')
        },
            body: user, //Payload
            failOnStatusCode: false //Não se preocupa com o status code
        }).then((response) => { //Porque o request é uma promessa
            cy.log(JSON.stringify(response.body)) //Funcionalidade do cypress que exibe o log no teste
        })

        cy.doLogin(user.email, user.password) //Faz login através o custom commands
        cy.get('.dashboard', {timeout: 5000}).should('be.visible') //Espera 5s após fazer o login para pagantir que está no dashboard
    })

    const contact = {
        name: 'Amanda Silva',
        number: '48996561455',
        description: 'Aulas de espanhol'
    }

    context(`Dado que ${contact.name} é um bom contato`, () => {

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

        it('Quando acesso o dashboard', () => {
            cy.dash()
        })

        it('Devo ver a propriedade href com o link do Whatsapp Web', () => {
            const externalLink = `https://api.whatsapp.com/send?phone=55${contact.number}`
            cy.get(`a[href$="${contact.number}"]`).should('have.attr', 'href', externalLink)
        })
    })
})