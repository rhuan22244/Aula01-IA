let x11 = 0, x12 = 0, resultado1 = 0
let x21 = 0, x22 = 1, resultado2 = 0
let x31 = 1, x32 = 0, resultado3 = 1
let x41 = 1, x42 = 0, resultado4 = 1

let p1 = -1, p2 = -1

let soma, ajustes, quantidadeAjustesTotais = 0, repeticoes = 0

do {
    ajustes = 0

    soma = somar(x11, x12)
    y = transferencia(soma)
    if(y != resultado1){
        ajustar(x11, x12, resultado1, y)
        ajustes++
        quantidadeAjustesTotais++
    }
    console.log(y,resultado1);

    soma = somar(x21, x22)
    y = transferencia(soma)
    if(y != resultado2){
        ajustar(x21, x22, resultado2, y)
        ajustes++
        quantidadeAjustesTotais++
    }

    soma = somar(x31, x32)
    y = transferencia(soma)
    if(y != resultado3){
        ajustar(x31, x32, resultado3, y)
        ajustes++
        quantidadeAjustesTotais++
    }
    console.log("Teste " + y + ":" + resultado3);

    soma = somar(x41, x42)
    y = transferencia(soma)
    if(y != resultado4){
        ajustar(x41, x42, resultado4, y)
        ajustes++
        quantidadeAjustesTotais++
    }

} while (ajustes != 0)

console.log("Teste de aprendizagem com rede neural\n");
console.log("\nPeso 1" + p1);
console.log("\nPeso 1" + p2);
console.log("Foram necessarios " + quantidadeAjustesTotais + " ajustes para treinar a rede neural.");

function somar(x1, x2) 
{
    return (x1*p1) + (x2 * p2)
}

function transferencia()
{

    if (soma <= 0) {
        return 0
    }
    return 1

}

function ajustar(entrada1, entrada2, resultadoEsperado, resultadoObtido)
{
    p1 = p1 + 1 * (resultadoEsperado - resultadoObtido) * entrada1
    p2 = p2 + 1 * (resultadoEsperado - resultadoObtido) * entrada2
    
}

