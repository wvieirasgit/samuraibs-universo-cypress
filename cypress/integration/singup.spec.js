

import { faker } from '@faker-js/faker'
//import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context.skip('quando o usuario e novato', function () {
        //definindo massa de teste
        const user = {
            name: 'Welder Vieira',
            email: 'Welder@samurai.com.br',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            signupPage.go()
            cy.get('div [href="/signup"] ').click()

            //preenchendo e submentendo o formulario
            signupPage.form(user)
            signupPage.submit()

            //validação do resultado esperado
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

    })

    it.skip('deve cadastrar um novo funcionario', function () {


        const name = 'Welder Vieira'
        const email = faker.internet.email()
        const password = 'pwd123'

        cy.visit('/')
        cy.get('div [href="/signup"] ').click()

        cy.get('input[placeholder="Nome"]').type(name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get(' input[placeholder="Senha"]').type(password)



        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

        cy.wait(1000)
        cy.get('body')
    })

    it.skip('deve cadastrar um novo funcionario com email ja cadastrado', function () {


        const name = 'Welder Vieira'
        const email = 'teste.unidas@gmail.com'
        const password = 'pwd123'

        cy.visit('/')
        cy.get('div [href="/signup"] ').click()

        cy.get('input[placeholder="Nome"]').type(name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get(' input[placeholder="Senha"]').type(password)



        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.')

        cy.wait(1000)
        cy.get('body')
    })

    it.skip('deve cadastrar um novo funcionario com alteraçãodo retorno da API', function () {


        const name = 'Welder Vieira'
        const email = 'teste.unidas@gmail.com'
        const password = 'pwd123'

        cy.visit('/')
        cy.get('div [href="/signup"] ').click()

        cy.get('input[placeholder="Nome"]').type(name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get(' input[placeholder="Senha"]').type(password)

        cy.intercept('POST', '/users', {    //ouvinte que intercepta rota /users a resposta da requisição só funciona com api rest
            statusCode: 200             //altera a resposta da requisição
        }).as('postUser')

        cy.contains('button', 'Cadastrar').click() //clicando no botão

        cy.wait('@postUser')                // esperar a a mudança do code da requisição

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

        cy.wait(1000)
        cy.get('body')
    })
    //definindo massa de teste
    //const user = {
    // name: 'Welder Vieira',
    // email: 'Welder@samurai.com.br',
    // password: 'pwd123'
    //  }

    it.skip('deve cadastrar um novo funcionario com conexão no db para excluir o usuario cadastrado no banco', function () {

        //criar uma task para remover o usuario do banco, para a massa seja sempre valida
        cy.task('removeUser', user.email)
            .then(function (result) {
                console.log(result)
            })


        //acessando pagina de cadastro
        signupPage.go()
        cy.get('div [href="/signup"] ').click()


        //preenchendo e submentendo o formulario
        signupPage.form(user)

        signupPage.submit()

        //validação do resultado esperado
        signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        //cy.wait(1000)
        //cy.get('body')
    })

    it.skip('deve exibir email cadastrado', function () {

        signupPage.go()
        cy.get('div [href="/signup"] ').click()

        signupPage.form(user)
        signupPage.submit()
        signupPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')


        // cy.wait(1000)
        // cy.get('body')
    })

    context.skip('quando o email e incorreto', function () {
        //definindo massa de teste
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com.br',
            password: 'pwd123'
        }
        it('deve exibir msg de alerta', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        })
    })

    context.skip('quando a senha e muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']


        beforeEach(function () {
            signupPage.go()
            cy.get('div [href="/signup"] ').click()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha ', function () {

                const use = {
                    name: 'jakson Perreira',
                    email: 'jakson.Perreira@qa.com.br',
                    password: p
                }

                signupPage.form(use)
                signupPage.submit()
            })

        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context.only('quando não preencgo nenhum campo', function () {

        const alertMessanges = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatóriaclear'
        ]
        before(function () {
            signupPage.go()
            cy.get('div [href="/signup"] ').click()
            signupPage.submit()
        })

        alertMessanges.forEach(function (alert) {
            it('deve exibir' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)
            })
        })
    })
})