/**********************************************************
 * Objetivo: Criar a interação com o Banco de dados MySQL *
 * para fazer o CRUD de filmes                            *
 * Data: 30/01/24                                         *
 * Autor: Vitoria Azevedo da Cruz                         *
 * Versão: 1.0                                            *
***********************************************************/
//Import da biiblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//Inserir um novo filme
const insertFilme = async function (dadosFilme) {
    try {
        let sql
        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined){
            //ScriptSQL para inserir no BD
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`  
        }else{
            //ScriptSQL para inserir no BD
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`
        }   
        //Executa o scriptSQL no BD (devemos usar o comando EXECUTE e não o QUERY)
        //O comando EXECUTE deve ser utilizado para (insert, update e delete)
        let result = await prisma.$executeRawUnsafe(sql)

        //Validação para verificar se o INSERT funcionou no BD
        if(result){
            selectIdLastInsertID()
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

//Atualizar um filme existente filtrando pelo ID
const updateFilme = async function (dadosFilme, id) {
    try{
        let sql
        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined){
            //ScriptSQL para inserir no BD
            sql = `update tbl_filme
                set nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = null,
                duracao = '${dadosFilme.duracao}',
                foto_capa ='${dadosFilme.foto_capa}',
                valor_unitario = '${dadosFilme.valor_unitario}'
                where id=${id}`  
        }else{
            //ScriptSQL para inserir no BD
            sql = `update tbl_filme
                set nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = '${dadosFilme.data_relancamento}',
                duracao = '${dadosFilme.duracao}',
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario = '${dadosFilme.valor_unitario}'
                where id=${id}`
        }
        let rsFilme = prisma.$executeRawUnsafe(sql)
        return rsFilme
    }catch(error){
        return false
    }        
}

//Excluir um filme existente filtrando pelo ID
const deleteFilme = async function (id) {
    try{
        let filmeId = id
        let sql = `delete from tbl_filme where id=${filmeId}`
        let rsFilmeDeletado = prisma.$executeRawUnsafe(sql)
        return rsFilmeDeletado
    }catch(error){
        return false
    }
}

//Listar todos os filmes existentes - *
const selectAllFilmes = async function () {
    try {
        //Script SQL para listar todos os registros
        let sql = 'select * from tbl_filme order by id desc'

        //$queryRawUnsafe() --- encaminha apenas a variável
        //$queryRaw('select * from tbl_filme) --- encaminha o script

        //Executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        console.log(error)
        return false
    }
}

//Buscar o filme existente filtrando pelo ID - *
const selectByIdFilme = async function (id) {
    try {
        //Realiza a busca do filme pelo ID
        let sql = `select * from tbl_filme where id = ${id};`

        //Executa no Banco de Dados os script sql
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme

    } catch (error) {
        return false
    }
}

//Buscar o filme existete filtrando pelo nome - *
const selectByNameFilme = async function (nomeFilme) {
    try {
        let filmeNome = nomeFilme

        let sqlFilme = `select * from tbl_filme where nome like '%${filmeNome}%'`

        let rsFilmeNome = await prisma.$queryRawUnsafe(sqlFilme)

        return rsFilmeNome
    } catch (error) {
        return false
    }
}

const selectIdLastInsertID = async function () {
    try{
        // let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1'
        let sql = 'select id from tbl_filme order by id desc limit 1'
        let rsID = await prisma.$queryRawUnsafe(sql)
        return rsID
    }catch(error){
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNameFilme,
    selectIdLastInsertID
}