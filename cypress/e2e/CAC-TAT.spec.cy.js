/// <reference types="Cypress"/>

describe('Central de Atentimento ao Cliente TAT', () => {
  //Antes de cada teste, visite o endereço que eu passar
  beforeEach(() => {
    cy.visit('./src/index.html')
  })


  it('Verifica Título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Thiagão Da Massa')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Thiaguissimo')
      .should('have.value', 'Thiaguissimo')
    cy.get('#lastName')
      .should('be.visible')
      .type('Ribeirão')
      .should('have.value', 'Ribeirão')
    cy.get('#email')
      .should('be.visible')
      .type('antonio.feliciano@btgpactual.com')
      .should('have.value', 'antonio.feliciano@btgpactual.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classifi cado para libertadores?')
    cy.get('.button').click()
    cy.get('span[class="success"]').should('be.visible')
  })
  
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Thribeirodev')
      .should('have.value', 'Thribeirodev')
    cy.get('#lastName')
      .should('be.visible')
      .type('Feliciano')
      .should('have.value', 'Feliciano')
    cy.get('#email')
      .should('be.visible')
      .type('antonio.feliciano,btgpactual.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classificado para libertadores?')
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Thribeirodev')
      .should('have.value', 'Thribeirodev')
      cy.get('#lastName')
      .should('be.visible')
      .type('Feliciano')
      .should('have.value','Feliciano')
    cy.get('#email')
      .should('be.visible')
      .type('antonio.feliciano,btgpactual.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classificado para libertadores?')
    cy.get('#phone-checkbox')
      .click()
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')
  })

  it('Valida campo de telefone', () => {
    cy.get('#phone').type('sfhwuefjewfkjxeohfwopalzzqz;/.´ç´[p´p')
      .should('have.value', '')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Thiago')
      .should('have.value','Thiago')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Ribeiro')
      .should('have.value','Ribeiro')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('antonio.feliciano,btgpactual.com')
      .should('have.value','antonio.feliciano,btgpactual.com')
      .clear()
      .should('have.value','')
    cy.get('#phone')
      .type('2199999999')
      .should('have.value','2199999999')
      .clear()
      .should('have.value','')
  })

  it('Erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')
  })

  it('Verifica diminuição de código', () => {
    const formData = {
      firstName: "Antonio",
      lastName: "Feliciano de Castilho",
      email: "antonio.feliciano@btgpactual.com",
      message: "Vasco "
    }
    cy.fillMandatoryFieldsAndSubmit(formData)
  })

  it('Utilizando o contains', () => {
    const formData = {
      firstName: "Thiagao",
      lastName: "Feliciano de Castilho",
      email: "antonio.feliciano@btgpactual.com",
      message: "Vasco "
    }
    cy.fillMandatoryFieldsAndSubmit(formData)
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
  })
  it('Sem diminuir delay do teste', () => {
    const formData = {
      firstName: "Antonio",
      lastName: "Feliciano de Castilho",
      email: "antonio.feliciano@btgpactual.com",
      message: "Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco " 
    }
    cy.fillMandatoryFieldsAndSubmit(formData)
    cy.get('span[class="success"]').should('be.visible')

  })
  it('Diminuindo o delay do teste', () => {
    const longtext = "Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco " 
    cy.get('#firstName')
      .should('be.visible')
      .type('Thiaguissimo')
      .should('have.value', 'Thiaguissimo')
    cy.get('#lastName')
      .should('be.visible')
      .type('Ribeirão')
      .should('have.value', 'Ribeirão')
    cy.get('#email')
      .should('be.visible')
      .type('antonio.feliciano@btgpactual.com')
      .should('have.value', 'antonio.feliciano@btgpactual.com')
    cy.get('#open-text-area')
      .type(longtext,{delay: 0})
    cy.get('.button').click()
    cy.get('span[class="success"]').should('be.visible')

   })
   it('Seleciona tipo do produto', () => {
    const formData = {
      firstName: "Antonio",
      lastName: "Feliciano de Castilho",
      email: "antonio.feliciano@btgpactual.com",
      message: "Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco " 
    }
    cy.OnlyWriteObritatoryinputs(formData)
    cy.get('#product').select('Blog')
      .contains('Blog')
      .should('have.value', 'blog')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')
    
   })
   it('Selecionando radios do tipo de atendimento', () => {
    const formData = {
      firstName: "Antonio",
      lastName: "Feliciano de Castilho",
      email: "antonio.feliciano@btgpactual.com",
      message: "Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco " 
    }
    cy.OnlyWriteObritatoryinputs(formData)
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
      .should('be.checked')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')
   })
   //Pegando toddos os elementos das opções de atendimento, botoes de radius para checkar
   it('Utilizando wrap e each nos testes', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=> { //utilizo jquery criando um $radio onde com o each ele guarda CADA valor em $radio e crio uma função para que ele possa dazer PARA CADA valor, checkar, 
        //com o wrap ele empacota todos os valores e da um check em cada
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
   })

   it.only('Marcando varios checkboxes de uma só vez', () => {
    cy.get('input[type="checkbox"]')
      .as('checkbox')
      .check()
      
    cy.get('@checkbox')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })
    })

    it.only('Marca e desmarca todos os checkboxes', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')  
    })
    it.only('Marcando o check do telefone e o tornando obrigatorio', () => {
      const formData = {
        firstName: "Antonio",
        lastName: "Feliciano de Castilho",
        email: "antonio.feliciano@btgpactual.com",
        message: "Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco Vasco " 
      }
      cy.OnlyWriteObritatoryinputs(formData)

      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })

      cy.get('#phone-checkbox')
        .check()
        .should('be.checked')

      cy.get('#phone')
        .type('2199999999')
        .should('have.value', '2199999999')

      cy.get('.button').click()
      cy.get('span[class="success"]').should('be.visible')

    })
})