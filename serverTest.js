const express = require('express')
const app = express()

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

app.listen(8080,function(){
    console.log('listening on port 8080')
})


app.get('/',function(require,response){
    response.sendfile("index.htm");
})
