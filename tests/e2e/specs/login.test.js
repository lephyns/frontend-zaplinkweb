describe('Login', () => {

    const user = {
        email: 'rafaelraasdfbdaeadeelodasilva@outlook.com',
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
            console.log(response.body)
            cy.log(JSON.stringify(response.body)) //Funcionalidade do cypress que exibe o log no teste
        })
    })

    context('Quando submeto credenciais válidas', () => {
        before(() => {
            cy.doLogin(user.email, user.password)
        })

        it('Deve exibir a área logada', () => {
            cy.contains('h4', 'Seu gerenciador digital de contatos').should('be.visible')
        })
    })

    // context('Quando submeto senha incorreta', () => {

    //     const expectMessage = 'E-mail ou senha incorretos'

    //     before(() => {
    //         cy.doLogin(user.email, 'abc123')
    //     })

    //     it(`Deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => { //Este código louco é para tirar os caracteres especiais da const expectMessage e vai substituir eles por nada
    //         cy.loginAlert(expectMessage).should('be.visible')
    //     })
    // })

    // context('Quando não informo o e-mail', () => {

    //     const expectMessage = 'Oops. Por favor informe seu e-mail'

    //     before(() => {
    //         cy.doLogin('', user.password)
    //     })

    //     it(`Deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => {
    //         cy.loginAlert(expectMessage).should('be.visible')
    //     })
    // })

    // context('Quando não informo a senha', () => {

    //     const expectMessage = 'Oops. Por favor informe sua senha'

    //     before(() => {
    //         cy.doLogin(user.email, '')
    //     })

    //     it(`Deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => {
    //         cy.loginAlert(expectMessage).should('be.visible')
    //     })
    // })
})