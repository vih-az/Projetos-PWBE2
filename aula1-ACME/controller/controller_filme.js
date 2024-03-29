/*******************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a    * 
 * model, que teremos todas as tratativas e regra de noegócio para *
 * o CRUD de filmes                                                *
 * Data: 30/01/24                                                  *
 * Autor: Vitoria Azevedo da Cruz                                  *
 * Versão: 1.0                                                     *
********************************************************************/


const message = require("../modulo/config.js")

//Import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme no Banco de Dados
const setInserirNovoFilme = async function (dadosFilme, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //Cria a variável JSON
            let resultDadosFilme = {}
            //Validação para verificar campos obrigatórios e consistência de dados
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8) {
                return message.ERROR_REQUIRED_FIELDS //400 Campos obrigatórios / incorretos
            } else {
                //Variável para validar se poderemos chamar o DAO para inserir os dados
                let dadosValidated = false
                //Validação de digitação para a data de relancamento que não é campo obrigatório
                if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento != "") {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400 campos obrigatórios / incorreto
                    } else {
                        dadosValidated = true // se a data estiver com exatamente 10 char
                    }
                } else {
                    dadosValidated = true // se a data não existir nos dados
                }
                //validação para verificar se podemos encaminhar os dados para o DAO
                if (dadosValidated) {
                    //encaminha os dados para o DAO inserir no BD
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)
                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if (novoFilme) {
                        let returId = await filmesDAO.selectIdLastInsertID()
                        console.log(returId)
                        //Cria o padrão JSON para reorno dos dados criados no BD
                        resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        resultDadosFilme.filme.id = returId[0].id
                        return resultDadosFilme//201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500 erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para atualizar um filme existente
const setAtualizarFilme = async function (idFilme, dadosFilme, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultadoDadosDosFilmes = {}
            let filmeId = idFilme
            if (filmeId == '' || filmeId == undefined || isNaN(filmeId)) {
                return message.ERROR_INVALID_ID
            } else {
                let validarId = await filmesDAO.selectByIdFilme(filmeId)
                if (validarId == false) {
                    return message.ERROR_NOT_FOUND
                } else if (validarId.length > 0) {
                    if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                        dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                        dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                        dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                        dadosFilme.valor_unitario.length > 8) {
                            console.log('teste')
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        let dadosValidar = false
                        if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento != " ") {
                            if (dadosFilme.data_relancamento.length != 10) {
                                return message.ERROR_REQUIRED_FIELDS
                            } else {
                                dadosValidar = true
                            }
                        } else {
                            dadosValidar = true
                        }
                        if (dadosValidar) {
                            let atualizarFilme = await filmesDAO.updateFilme(filmeId, dadosFilme)
                            if (atualizarFilme) {
                                resultadoDadosDosFilmes.status = message.SUCCESS_UPDATED_ITEM.status
                                resultadoDadosDosFilmes.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                                resultadoDadosDosFilmes.message = message.SUCCESS_UPDATED_ITEM.message
                                resultadoDadosDosFilmes.filme = dadosFilme
                                return resultadoDadosDosFilmes
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para excluir um filme existente
const setExcluirFilme = async function (id) {
    try {
        let filmeId = id
        if(filmeId == '' || filmeId == undefined || isNaN(filmeId)){
            return message.ERROR_INVALID_ID
        } else {
            let validarId = await filmesDAO.selectByIdFilme(filmeId)
            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else if (validarId.length > 0) {
                let deletarFilme = await filmesDAO.deleteFilme(filmeId)
                if (deletarFilme) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os filmes do Banco de Dados - *
const getListarFilmes = async function () {
    try {
        //Cria uma variável do tipo JSON
        let filmesJSON = {}

        //Chama a função do DAO para buscar os dados do BD
        let dadosFilmes = await filmesDAO.selectAllFilmes()

        //Verifica se os dados no DB foram processados
        if (dadosFilmes) {
            //Verifica se existem dados de retorno
            if (dadosFilmes.length > 0) {
                //Montando o JSON para retornar para o APP
                filmesJSON.filmes = dadosFilmes
                filmesJSON.quantidade = dadosFilmes.length
                filmesJSON.status_code = 200

                //Retorna o JSON montado
                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para buscar um filme pelo ID - *
const getBuscarFilme = async function (id) {
    try {
        //Recebe o id do filme
        let idFilme = id

        //Variável para criar o JSON de retorno do filme
        let filmeJSON = {}

        //Validação para ID vazio, indefinição ou não numérico
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            //Solicita para o DAO a busca do filme pelo ID
            let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

            //Validação para verificar se os dados no servidor de BD foram processados
            if (dadosFilme) {
                //Validação para verificar se existem dados de retorno
                if (dadosFilme.length > 0) {
                    filmeJSON.status_code = 200
                    filmeJSON.filme = dadosFilme

                    return filmeJSON
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para buscar um filme pelo nome - *
const getBuscarFilmePeloNome = async function (nomeFilme) {
    try {
        let filmeNome = nomeFilme

        let filmesJson = {}

        if (filmeNome == '' || filmeNome == undefined) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosDosFilmes = await filmesDAO.selectByNameFilme(filmeNome)
            //Verifica se os dados no DB foram processados
            if (dadosDosFilmes) {
                if (dadosDosFilmes.length > 0) {
                    filmesJson.status_code = 200
                    filmesJson.filmes = dadosDosFilmes
                    filmesJson.quantiade = dadosDosFilmes.length

                    return filmesJson
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmePeloNome
}