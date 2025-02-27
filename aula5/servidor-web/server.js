const http = require('http'); // modulo http

const produtos = [
    {      id:1 , nome: 'sib', preço: 22.00 },
    {      id:2 , nome: 'xiwT', preço: 7.50 },
    {      id:3 , nome: 'otnert', preço: 8.00  },
]
    

// criando server
const server = http.createServer((req, res) => {
    const { method, url } = req;        // atribuindo const para os metodos

    console.log(`Requisição recebida: ${method}${url}`);

    // tratando a url
    if (url === '/' && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home</h1>')
    } else if (url === '/produtos' && method === 'GET'){
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(produtos));
    } else if(url.startsWith('/produtos/') && method === 'GET'){
        // isolando os id
        const id = parseInt(url.split('/')[2]);
        // procurando id produto
        const produto = produtos.find(p => p.id === id);

        if(produto){
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(produto));

        } else {
            res.writeHead(404, { 'Content-type':'text/plain' });
            res.end('Erro 404 (esse produto não exitse)')
        }

        // method post
      } else if (url === '/contato' && method ==='POST'){
        // criando corpo
        let body = '';
        // resposta servidor
        req.on('data', chunck => { // chunck para pegar um pedaço
            body += chunck; 
        });

        // resposta usuario
        req.on('end', ()=>{
            console.log('Dados recbidos: ', body);
            res.writeHead(201, {'Content-type':'text/plain'}); // 201 para post
            res.end('Dados recebidos com sucesso!!!');
        })

      }


});

// criando a porta pro localhost:
const port = 3000;
server.listen(port, () => {

    console.log(`Servidor rodando em http://localhost:${port}`)
})