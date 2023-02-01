const bodyParser = require('body-parser')
const Express = require('express')
const app = Express()


// Conexão com o banco
const dbConexao = require('./database/conexao')

dbConexao.authenticate()
.then(()=>{
    console.log('Conexão realizada com sucesso')
})
.catch((error)=>{
    console.log(error)
})
// dbConexao.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

// Tabelas
const Usuario = require('./database/model/Usuario')


// BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.post('/salvarUsuario', (req, res)=>{
    let email = req.body.email
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let nascimento = req.body.nascimento

    Usuario.create({
        email: email,
        nome: nome,
        sobrenome: sobrenome,
        nascimento: nascimento
    }).then(()=>{
        res.redirect('/home')
    })
})


// Config EJS
app.set('view engine', 'ejs')

// Arquivos estaticos
app.use(Express.static('public'))

app.get('/cadastro', (req, res)=>{
    res.render('home')
})

app.listen(8585, (error)=>{
    if(error){
        console.log('Servidor não foi iniciado por algum erro. Verifique!')
    }else{
        console.log('Servidor iniciado com sucesso!')
    }
})