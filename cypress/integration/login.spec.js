import loginPage from '../support/pages/login'
import DashPage from '../support/pages/dash'
import elements from '../support/pages/login'


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

    context('o usuario e bom mas a senha e ruim', function () {



        let user = {
            name: 'celso',
            email: 'celso@yahoo.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {      //then e para esperar um depois fazer o outro
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

    context('quando o formato de email é invallido', function () {
        const emails = [
            'papito.com.br',
            '@yahoo.com.br',
            'geraldo@',
            '123',
            '!@#$',
            'xpto123'
        ]

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('não deve logar com o email' + email, function () {
                const user = {
                    email: email,
                    password: 'xpto123'
                }


                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
                
            })
        })
    })

    context('quando não preencho nenhum campo', function () {

        const alertMessanges = [
            
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessanges.forEach(function (alert) {
            it('deve exibir' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)
                
           })
        })
    })

})