import { el } from './elements'
import toast from '../../components/toast'


class SingupPage {


    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }
    submit() {

        cy.contains(el.singupButton).click()

    }
    toastHaveText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')

    }
}

export default new SingupPage()