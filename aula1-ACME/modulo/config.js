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
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem dados obrigatórios que não foram preenchidos corretamente !!'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O Content-Type da requisição não é suportado. Precisa ser enviado dados no formato application/json'}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Ocorreram erros internos no servidor na camada de negócio da API, por favor contate o administrador do sistema !!'}
/*********************MENSAGENS DE SUCESSO********************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso no Banco de Dados !!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item deletado com sucesso no Banco de Dados !!'}
const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso no Banco de Dados !!'}
module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
}