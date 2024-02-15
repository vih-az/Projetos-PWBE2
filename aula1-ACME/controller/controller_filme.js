/*******************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a    * 
 * model, que teremos todas as tratativas e regra de noegócio para *
 * o CRUD de filmes                                                *
 * Data: 30/01/24                                                  *
 * Autor: Vitoria Azevedo da Cruz                                  *
 * Versão: 1.0                                                     *
********************************************************************/


//Import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme no Banco de Dados
const setInserirNovoFilme = async function(){

}

//Função para atualizar um filme existente
const setAtualizarFilme = async function(){

}

//Função para excluir um filme existente
const setExcluirFilme = async function(id){

}

//Função para retornar todos os filmes do Banco de Dados
const getListarFilmes = async function(){

    //Cria uma variável do tipo JSON
    let filmesJSON = {}

    //Chama a função do DAO para buscar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Verifica se existem dados retornados do DAO
    if(dadosFilmes){
        //Montando o JSON para retornar para o APP
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        //Retorna o JSON montado
        return filmesJSON
    }else{
        //Return false quando não houverem dados
        return false
    }
}

//Função para buscar um filme pelo ID
const getBuscarFilme = async function(id){

}

const getBuscarFilmePeloNome = async function(nomeFilme){
    let filmeNome = nomeFilme

    let filmesJson = {}

    let dadosDosFilmes = await filmesDAO.selectByNameFilme(filmeNome)

    if(dadosDosFilmes){
        filmesJson.filmes = dadosDosFilmes
        filmesJson.quantiade = dadosDosFilmes.length
        filmesJson.status_code = 200

        return filmesJson
    }else{
        return false
    }
}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmePeloNome
}