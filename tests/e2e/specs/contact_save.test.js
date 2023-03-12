describe('Cadastro de contatos', () => {

    const user = {
        email: 'joao@yahoo.com',
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

    describe('Novo contato', () => {
        let contact = {
            name: 'Paulo Silva',
            number: '48 996561429',
            description: 'Solicitar orçamento para consultoria em Adobre XD'
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve cadastrar este contato', () => {
                cy.contactList().contains(contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {

            let contact = {
                // name: 'Paulo Silva',
                number: '48 996561410',
                description: 'Solicitar orçamento para consultoria em Adobre XD'
            }

            const expectMessage = 'Nome é obrigatório.'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => { //Este código louco é para tirar os caracteres especiais da const expectNotice e vai substituir eles por nada
                // cy.loginAlert(expectMessage).should('be.visible')
                cy.alertName().contains(expectMessage)
            })
        })

        describe('Quando submeto o cadastro sem o WhatsApp', () => {

            let contact = {
                name: 'Paulo Silva',
                // number: '48 996561410',
                description: 'Solicitar orçamento para consultoria em Adobre XD'
            }

            const expectMessage = 'WhatsApp é obrigatório.'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a nitificação: ${expectMessage}`, () => {
                cy.alertNumber().contains(expectMessage)
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {

            let contact = {
                name: 'Paulo Silva',
                number: '48 996561410',
                // description: 'Solicitar orçamento para consultoria em Adobre XD'
            }

            const expectMessage = 'Assunto é obrigatório.'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a nitificação: ${expectMessage}`, () => {
                cy.alertDesc().contains(expectMessage)
            })
        })

    })
})

//Describe não conta como teste. Apenas os it