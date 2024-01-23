const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const filmesFuncoes = require('./controller/getFilmes')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

app.get('/v1/acme/filmes', cors(), async function (request, response, next) {
    let listaDeFilmes = filmesFuncoes.getFilmes()

    if (listaDeFilmes) {
        response.json(listaDeFilmes)
        response.status(200)
    } else {
        response.json({ erro: "Filme não encontrado" })
        response.status(404)
    }
})

app.get('/v1/acme/filmes/:id', cors(), async function (request, response, next) {
    let idDoFilme = request.params.id
    let filmeEscolhido = filmesFuncoes.getFilmesPeloId(idDoFilme)

    if (filmeEscolhido) {
        response.json(filmeEscolhido)
        response.status(200)
    }else{
        response.json({erro: "Filme não encontrado"})
        response.status(404)
    }
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})