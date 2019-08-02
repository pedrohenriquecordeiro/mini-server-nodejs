const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var autores = [ 
    { id: 1 , name: "Pedro"    , email: "pedro@gmail.com"}, 
    { id: 2 , name: "Edlamary" , email: "edlamary@gmail.com"},
    { id: 3 , name: "Breno"    , email: "breno@gmail.com"},
    { id: 4 , name: "Bruno"    , email: "bruno@gmail.com"},
    { id: 5 , name: "Ludmilla" , email: "ludmilla@gmail.com"}, 
    { id: 6 , name: "Willian"  , email: "willian@gmail.com"},
    { id: 7 , name: "Fabricio" , email: "fabricio@gmail.com"},
    { id: 8 , name: "Andressa" , email: "andressa@gmail.com"}
];

var livros = [ 
    { id: 1 , title: "Harry Potter Completo" , id_autor: "2" , price: 300}, 
    { id: 2 , title: "Monique"               , id_autor: "2" , price: 100},
    { id: 3 , title: "Guerra dos Tronos"     , id_autor: "1" , price: 800},
    { id: 4 , title: "Lollita"               , id_autor: "3" , price: 30},
    { id: 5 , title: "Crepusculo"            , id_autor: "4" , price: 120}, 
    { id: 6 , title: "50 tons de cinza"      , id_autor: "8" , price: 560},
    { id: 7 , title: "Poderoso Chefão"       , id_autor: "6" , price: 230},
    { id: 8 , title: "Sherlock Holmes"       , id_autor: "7" , price: 25},
    { id: 9 , title: "A culpa é das estrelas", id_autor: "5" , price: 230}
];

var id_autor = 8;
var id_livro = 9;

// Add headers
app.use(function (require,response, next) {

    // Website you wish to allow to connect
    response.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.header("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
})

/* parser json para o post */
app.use(bodyParser.json())

app.listen(8080,function(){
    console.log('listening on port 8080')
})


app.get('/api/autores',function(require,response){
    response.json(autores)
})

app.post('/api/autores',function(require,response){
    if(require.body.name === '' 
        || require.body.email === '' 
        || require.body.password === ''){
        /* a gnt envia vazio msm - mas reporta um*/

        let erro = require.body;
        
        if(erro.name === ''){
            erro.name = '&';
        }
        if(erro.email === ''){
            erro.email = '&';
        }
        if(erro.password === ''){
            erro.password = '&';
        }
  
        response
            .status(400)
            .json( erro )
            .end();
    }else{
        id_autor = id_autor + 1;
        let novo_autor = { id: id_autor , name: require.body.name , email: require.body.email };
        autores.push(novo_autor);
        response.json(autores);
    }
})

app.get('/api/livros',function(require,response){
    console.log("get to /api/livros");
    console.log(require.body);
    response.json(livros)
}) 
app.post('/api/livros',function(require,response){
    console.log(require.body);
    if(require.body.title === '' 
        || require.body.id_autor === '' 
        || require.body.price === ''){

        console.log("post fail to /api/livros");   

        let erro = require.body;
        
        if(erro.title === ''){
            erro.title = '&';
        }
        if(erro.id_autor === ''){
            erro.id_autor = '&';
        }
        if(erro.price === ''){
            erro.price = '&';
        }
  
        response
            .status(400)
            .json( erro )
            .end();
    }else{
        console.log("post sucess to /api/livros");
        console.log(require.body);
        id_livro = id_livro + 1;
        let novo_livro = { id: id_livro , title: require.body.title , id_autor: require.body.id_autor ,price: require.body.price};
        console.log(novo_livro);
        livros.push(novo_livro);
        response.json(livros);
    }
})
  