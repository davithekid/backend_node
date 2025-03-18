const buscarDados = require('./funcaoAssincrona')

describe('Função Buscar dados', ()=> {
    it('Deve encontrador os dados corretamente', () => {
        return buscarDados()
        .then(data => {
            expect(data).toBeDefined();
            expect(data.userId).toBe(1);
        })
    })
})