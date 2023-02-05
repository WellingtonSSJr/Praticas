const bodyParser = require('body-parser')
const Express = require('express')
const app = Express()
const session = require('express-session')
const  flash  = require('express-flash');
const cookieParser = require('cookie-parser')


// Config EJS
app.set('view engine', 'ejs')

// Arquivos estaticos
app.use(Express.static('public'))

// cookie-parser
app.use(cookieParser('abcdefgh'))

// express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))

// express flash
app.use(flash({ sessionKeyName: 'flashMessage' }));

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


app.get('/cadastro', (req, res)=>{
    let emailError = req.flash('emailError');
    let nomeError  = req.flash('nomeError');
    let passwordError  = req.flash('passwordError');

    let emailErr = (emailError == undefined || emailError.length == 0) ? undefined : emailError

    let nomeErr = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError

    let passwordErr = (passwordError == undefined || passwordError.length == 0) ? undefined : passwordError

    let nome = 'Wellington'

    res.render('home', {emailErr, nomeErr, passwordErr})
})


// ############################# ROTA POST

app.post('/salvarUsuario', (req, res)=>{
    
    let {email, nome, sobrenome, password, nascimento} = req.body

    let emailError;
    let nomeError;
    let passwordError;
    
    if(email == undefined || email == ""){
        emailError = 'Verifique o e-mail digitado'

    }
    if(nome == undefined || nome == ""){
        nomeError = 'Nome obrigatório'
    }
    if(password == undefined || password == ""){
        passwordError = 'A senha é obrigatória'
    }

    if(emailError != undefined || nomeError != undefined || passwordError != undefined){
        req.flash('emailError',emailError )
        req.flash('nomeError',nomeError)
        req.flash('passwordError', passwordError)
        res.redirect('/cadastro')

        // res.send('erro feio')
    }else{
        res.send('passou')
        Usuario.create({
            email: email,
            nome: nome,
            sobrenome: sobrenome,
            password: password,
            nascimento: nasc
        }).then(()=>{
            res.redirect('teste')
        })
    }

   
})





app.listen(8585, (error)=>{
    if(error){
        console.log('Servidor não foi iniciado por algum erro. Verifique!')
    }else{
        console.log('Servidor iniciado com sucesso!')
    }
})