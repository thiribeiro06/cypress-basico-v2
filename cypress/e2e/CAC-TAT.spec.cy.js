/// <reference types="Cypress"/>
const time_to_msg_visible = 3000
describe('Central de Atentimento ao Cliente TAT', () => {  
  beforeEach(() => {
    cy.visit('./src/index.html')
  })


  it('Verifica Título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Tom')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Tom')
      .should('have.value', 'Tom')
    cy.get('#lastName')
      .should('be.visible')
      .type('Riddle')
      .should('have.value', 'Riddle')
    cy.get('#email')
      .should('be.visible')
      .type('tomriddle@test.com')
      .should('have.value', 'tomriddle@test.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classifi cado para libertadores?')
    cy.get('.button').click()
    cy.get('span[class="success"]').should('be.visible')
  })
  
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName')
      .should('be.visible')
      .type('Tom')
      .should('have.value', 'Tom')
    cy.get('#lastName')
      .should('be.visible')
      .type('Riddle')
      .should('have.value', 'Riddle')
    cy.get('#email')
      .should('be.visible')
      .type('tomriddle,test.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classificado para libertadores?')
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')

    cy.tick(time_to_msg_visible)
    cy.get('[class="error"]')
      .should('not.be.visible')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName')
      .should('be.visible')
      .type('Tom')
      .should('have.value', 'Tom')
      cy.get('#lastName')
      .should('be.visible')
      .type('Riddle')
      .should('have.value','Riddle')
    cy.get('#email')
      .should('be.visible')
      .type('tomriddle@test.com')
    cy.get('#open-text-area')
      .type('Qual a probabilidade do Vasco ser classificado para libertadores?')
    cy.get('#phone-checkbox')
      .click()
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')
    
    cy.tick(time_to_msg_visible)
    cy.get('[class="error"]')
      .should('not.be.visible')
  })

  it('Valida campo de telefone', () => {
    cy.get('#phone').type('sfhwuefjewfkjxeohfwopalzzqz;/.´ç´[p´p')
      .should('have.value', '')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Tom')
      .should('have.value','Tom')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Riddle')
      .should('have.value','Riddle')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('tomriddle@test.com')
      .should('have.value','tomriddle@test.com')
      .clear()
      .should('have.value','')
    cy.get('#phone')
      .type('2199999999')
      .should('have.value','2199999999')
      .clear()
      .should('have.value','')
  })

  it('Erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.get('.button')
      .click()
    cy.get('[class="error"]')
      .should('be.visible')
      .should('contain','Valide os campos obrigatórios!')

    cy.tick(time_to_msg_visible)
    cy.get('[class="error"]')
      .should('not.be.visible')
  })

  it('Verifica diminuição de código', () => {
    const formData = {
      firstName: "Jaffrey",
      lastName: "Thompson Grey",
      email: "jaffrey@test.com",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
    }
    cy.fillMandatoryFieldsAndSubmit(formData)
  })

  it('Utilizando o contains', () => {
    const formData = {
      firstName: "Jaffrey",
      lastName: "Thompson Grey",
      email: "jaffrey@test.com",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
    }
    cy.fillMandatoryFieldsAndSubmit(formData)
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
  })
  it('Sem diminuir delay do teste', () => {
    const formData = {
      firstName: "Jaffrey",
      lastName: "Thompson Grey",
      email: "jaffrey@test.com",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
     }
    cy.fillMandatoryFieldsAndSubmit(formData)
    cy.get('span[class="success"]').should('be.visible')

  })
  it('Diminuindo o delay do teste', () => {
    const longtext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
    cy.get('#firstName')
      .should('be.visible')
      .type('Tom')
      .should('have.value', 'Tom')
    cy.get('#lastName')
      .should('be.visible')
      .type('Riddle')
      .should('have.value', 'Riddle')
    cy.get('#email')
      .should('be.visible')
      .type('tomriddle@test.com')
      .should('have.value', 'tomriddle@test.com')
    cy.get('#open-text-area')
      .type(longtext,{delay: 0})
    cy.get('.button').click()
    cy.get('span[class="success"]').should('be.visible')

   })
   it('Seleciona tipo do produto', () => {
    cy.clock()
    const formData = {
      firstName: "Markety",
      lastName: "Markety Grey",
      email: "matkety@test.com",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
    }
    cy.OnlyWriteObritatoryinputs(formData)
    cy.get('#product').select('Blog')
      .contains('Blog')
      .should('have.value', 'blog')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')

    cy.tick(time_to_msg_visible)
    cy.get('span[class="success"]')
      .should('not.be.visible')
    
   })
   it('Selecionando radios do tipo de atendimento', () => {
    cy.clock()
    const formData = {
      firstName: "Ravier",
      lastName: "Thompson Grey",
      email: "ravier@test.com",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
    }
    cy.OnlyWriteObritatoryinputs(formData)
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
      .should('be.checked')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')
    
    cy.tick(time_to_msg_visible)
    cy.get('span[class="success"]')
      .should('not.be.visible')
   })

   it('Utilizando wrap e each nos testes', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=> { 
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
   })

   it('Marcando varios checkboxes de uma só vez', () => {
    cy.get('input[type="checkbox"]')
      .as('checkbox')
      .check()
      
    cy.get('@checkbox')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })
    })

    it('Marca e desmarca todos os checkboxes', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')  
    })
    it('Marcando o check do telefone e o tornando obrigatorio', () => {
      cy.clock()
      const formData = {
        firstName: "Jaffrey",
        lastName: "Thompson Grey",
        email: "jaffrey@test.com",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tellus nec sapien fringilla pharetra. Nulla facilisi. Nullam laoreet quam id sapien lacinia, in interdum justo euismod. Sed feugiat quam a tortor venenatis, sed fringilla massa vulputate." 
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

      cy.tick(time_to_msg_visible)
      cy.get('span[class="success"]')
        .should('not.be.visible')

    })
    it('Verificando politica de privacidade, lidando com links que abrem em outra aba', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    }) 

    it('Acessa a página da politica de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('Faz uma requisição HTTP', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) => {
          const { status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')      
      })
    })
    it('Desafio encontre o gato escondido', () => {
      cy.get('span[id="cat"]')
        .invoke('show')
        .should('be.visible')
    })

})