'use strict'

import { lerContatos, deletarContato, atualizarContato, criarContato, buscarContatoPorId } from './contatos.js'

const formContainer = document.querySelector('main')
const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    celular: document.getElementById('celular'),
    endereco: document.getElementById('endereco'),
    cidade: document.getElementById('cidade'),
    foto: document.getElementById('preview-image')
}

let idContatoEdicao = null

function abrirModal() {
    formContainer.classList.add('form-show')
}

function fecharModal() {
    formContainer.classList.remove('form-show')
    limparCampos()
    idContatoEdicao = null
}

function limparCampos() {
    Object.values(campos).forEach(campo => {
        if (campo.tagName === 'IMG') campo.src = './img/preview-icon.png'
        else campo.value = ''
    })
}

function preencherModal(contato) {
    campos.nome.value = contato.nome
    campos.email.value = contato.email
    campos.celular.value = contato.celular
    campos.endereco.value = contato.endereco
    campos.cidade.value = contato.cidade
    campos.foto.src = contato.foto || './img/preview-icon.png'
    
    idContatoEdicao = contato.id
    abrirModal()
}

function criarCard(contato) {
    const card = document.createElement('div')
    card.classList.add('card-contato')

    const img = document.createElement('img')
    img.src = contato.foto || './img/preview-icon.png'
    img.alt = `Foto de ${contato.nome}`

    const h2 = document.createElement('h2')
    h2.textContent = contato.nome

    const pEmail = document.createElement('p')
    pEmail.textContent = contato.email

    const pCelular = document.createElement('p')
    pCelular.textContent = contato.celular

    const btnExcluir = document.createElement('button')
    btnExcluir.textContent = 'Excluir'
    btnExcluir.classList.add('button')
    
    btnExcluir.addEventListener('click', async (e) => {
        e.stopPropagation()
        const confirmar = confirm(`Deseja remover ${contato.nome} da lista?`)
        if (confirmar) {
            await deletarContato(contato.id)
            carregarContatos()
        }
    })

    card.append(img, h2, pEmail, pCelular, btnExcluir)

    card.addEventListener('click', async () => {
        const dadosCompletos = await buscarContatoPorId(contato.id)
        preencherModal(dadosCompletos)
    })

    return card
}

async function carregarContatos() {
    const container = document.getElementById('container')
    container.replaceChildren()

    const listaContatos = await lerContatos()
    
    listaContatos.forEach(contato => {
        const card = criarCard(contato)
        container.appendChild(card)
    })
}

async function gerenciarSalvamento() {
    const dadosFormulario = {
        nome: campos.nome.value,
        email: campos.email.value,
        celular: campos.celular.value,
        endereco: campos.endereco.value,
        cidade: campos.cidade.value,
        foto: campos.foto.src
    }

    if (idContatoEdicao) {
        await atualizarContato(idContatoEdicao, dadosFormulario)
    } else {
        await criarContato(dadosFormulario)
    }

    fecharModal()
    carregarContatos()
}

document.getElementById('novo-contato').addEventListener('click', abrirModal)
document.getElementById('cancelar').addEventListener('click', fecharModal)
document.getElementById('salvar').addEventListener('click', gerenciarSalvamento)

document.getElementById('preview-image').addEventListener('click', () => {
    const urlImagem = prompt('Insira a URL da imagem:')
    if(urlImagem) document.getElementById('preview-image').src = urlImagem
})

document.addEventListener('DOMContentLoaded', carregarContatos)