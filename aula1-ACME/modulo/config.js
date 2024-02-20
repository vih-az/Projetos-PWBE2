/**********************************************************************************************
 * Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores e conteúdos*
 * para o projeto                                                                             *
 * Data:20/02/24                                                                              *
 * Autor: Vitoria Azevedo da Cruz                                                             *
 * Versão: 1.0                                                                                *
 **********************************************************************************************/

/*********************MENSAGENS DE ERRO ***********************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição !!'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Ocorreram erros internos no sevidor de Banco de Dados, por favor contate o administrador do sistema !!'}

module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}