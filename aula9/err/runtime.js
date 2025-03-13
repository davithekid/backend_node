// erro na hora de compilar

let resultado = 10 /0;
console.log(resultado);

let objeto = null;
console.log(objeto.propriedade);

// Infinity
// Null

// C:\Users\24250492\Documents\2md-davi\nodeJS\err\runtime.js:5
// console.log(objeto.propriedade);
//                    ^

// TypeError: Cannot read properties of null (reading 'propriedade')
//     at Object.<anonymous> (C:\Users\24250492\Documents\2md-davi\nodeJS\err\runtime.js:5:20)
//     at Module._compile (node:internal/modules/cjs/loader:1358:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
//     at Module.load (node:internal/modules/cjs/loader:1208:32)
//     at Module._load (node:internal/modules/cjs/loader:1024:12)
//     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
//     at node:internal/main/run_main_module:28:49

