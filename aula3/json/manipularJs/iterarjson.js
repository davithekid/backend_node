const dados = {

    produtos: [
        { nome: 'RX 580', preço: 700 },
        { nome: 'RTX 4090', preço: 4000 },
        { nome: 'ryzen 5700g', preço: 120 }

    ]
};


dados.produtos.forEach(produto =>{

    console.log(`Nome: ${produto.nome} e o preço é: R$${produto.preço},00`)

})