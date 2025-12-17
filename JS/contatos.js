'use strict'

export async function lerContatos() {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const response = await fetch(url)
    const contatos = await response.json()
    return contatos
}

export async function buscarContatoPorId(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

export async function criarContato(contato) {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)
    return response.ok
}

export async function deletarContato(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: "DELETE",
    }
    const response = await fetch(url, options)
    return response.ok
}

export async function atualizarContato(id, contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)
    return response.ok
}