import loginPage from '../support/pages/login'
import DashPage from '../support/pages/dash'

describe('login', function () {


    context('quando o usuario e muito bom', function () {

        const user = {
            name: 'Jassa',
            email: 'jassa@samuraibs.com.br',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })


        it('deve logar com sucesso', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            DashPage.header.userLoggedIn(user.name)

        })

    })

    context.only('o usuario e bom mas a senha e ruim', function () {



        let user = {
            name: 'celso',
            email: 'celso@yahoo.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){      //then e para esperar um depois fazer o outro
                user.password = 'abc123'
            })
            
        })

        it('deve notificar erro de credenciais', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)
        })
    })
})