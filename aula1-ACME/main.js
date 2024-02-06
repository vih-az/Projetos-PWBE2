/***********************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes*
 * Data: 30/01/24                                          *
 * Autor: Vitoria Azevedo da Cruz                          *
 * Versão: 1.0                                             *
 ***********************************************************/

/*******************************************************************
 * O node por padrão, não faz conexão com o Banco de Dados,        *
 * portanto, precisamos de algumas dependênias para isso.          *
 *                                                                 *
 * Para realizar a conexão com o Banco de Dados precisamos utilizar*
 * algumas dependências:                                           *
 *      -SEQUELIZE ORM                                             *
 *      -PRISMA ORM                                                *
 *      -FASTIFY ORM                                               *
 *                                                                 *
 * PRISMA - Para utilizar o prisma precisamos instalar as seguintes*
 * dependências:                                                   *
 *  -npm install prisma --save                                     *
 *  -npm install @prisma/client --save                             *
 *                                                                 *
 * Após a instalação do PRISMA, devemos rodar o comando abaixo para*
 * inicializar o PRISMA                                            *
 *  -npx prisma init                                               *
 *******************************************************************/


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


/***************** Imports de arquivos e bibliotecas do Projeto ***************** */
const controllerFilmes = require('./controller/controller_filme.js')

/**********************************************************************************/
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

app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){

    //Chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    //Validação para verificar se existem dados
    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
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