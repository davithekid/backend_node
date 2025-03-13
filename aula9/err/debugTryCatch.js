try{
    let pesoas = undefined;
    console.log('Nome: ', pessoas.nome)
} catch (error){
    console.error('Ocorreu um erro: ' , error.message);
} finally {
    console.log('fim do bloco');
}