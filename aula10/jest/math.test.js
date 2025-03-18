const somar = require('./matematica')
const buscarDados = require('./funcaoAssincrona')


describe("Função somar", () =>{
    it('deve somar dois números corretamente', ()=> {
        expect(somar(5,2)).toBe(7)
    })
    it('deve somar números e negativos corretamente', ()=> {
        expect(somar(-3,2)).toBe(-1)
    })
    // it('nao pode somar números com letra', ()=> {
    //     expect(somar(a,2)).toBe(2)
    // })
    it('deve somar os números negativos', ()=> {
        expect(somar(-2,-2)).toBe(-4)
    })
})

