'use strict'

import { lerContatos, deletarContato, atualizarContato } from './contatos.js'

function criarCard(contato) {
    const card = document.createElement('div')
    card.classList.add('card-contato')

    const img = document.createElement('img')
    img.src = contato.foto || './img/preview-icon.png'

    const h2 = document.createElement('h2')
    h2.textContent = contato.nome

    const pEmail = document.createElement('p')
    pEmail.textContent = contato.email

    const pCelular = document.createElement('p')
    pCelular.textContent = contato.celular

    const btnExcluir = document.createElement('button')

    btnExcluir.textContent = 'Excluir'
    btnExcluir.classList.add('button')
    btnExcluir.addEventListener('click', async () => {
        if (confirm(`Deseja realmente excluir ${contato.nome}?`)) {
            const ok = await deletarContato(contato.id)
            if (ok) {
                card.remove()
            } else {
                alert('Erro ao excluir contato!')
            }
        }
    })

    card.append(img, h2, pEmail, pCelular, btnExcluir)
    return card
}

async function carregarContatos() {
    const container = document.getElementById('container')
    container.innerHTML = '' 

    const contatos = await lerContatos()
    console.log(contatos)

    contatos.forEach(contato => {
        const card = criarCard(contato)
        container.appendChild(card)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    carregarContatos()
})

