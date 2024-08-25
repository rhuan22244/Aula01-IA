class entrada {
    valorEntrada = 0;
    peso = 0;
}


entrada1 = new entrada();
entrada1.valorEntrada = -1
entrada.peso = 0


const entradas_pesos = [
    {entrada: -1, peso: 0},
    {entrada: 1, peso: -1},
    {entrada: 1, peso: 2}
];

let p1 = -1, p2 = -1, p3 = -1

const treinamento = [
    [0, 0, 0, 0],//Laranja - citrico
    [0, 0, 1, 0],//abacaxi - citico
    [0, 1, 0, 0],//morango - citrico
    [0, 1, 1, 0],//kiwi - citrico
    [1, 0, 0, 1],//mamão - doce
    [1, 0, 1, 1],//mamão - doce
    [1, 1, 0, 1],//mamão - doce
    [1, 1, 1, 1],//mamão - doce
];

//Escolha a função que vamos utilizar para calcular (LR,FR,FS)
let funcaoEscolhida = 'FS'

let y 

switch (funcaoEscolhida) {
    case 'LR' :
        y = limiteRapido(soma(entradas_pesos))
        console.log("Saida: " + y + ", Função utilizada: " +funcaoEscolhida)
        break;
    case 'FR' :
        y = funcaoRampa(soma(entradas_pesos))
        console.log("Saida: " + y + ", Função utilizada: " +funcaoEscolhida)
        break;
    case 'FS' :
        y = funcaoSigmoide(soma(entradas_pesos))
        console.log("Saida: " + y + ", Função utilizada: " +funcaoEscolhida)
        break;
    default:
        console.log("A alternativa não é valida")
}

function soma(entrada_pesos) {
    var soma = 0;
    for (let i = 0; i < entradas_pesos.length; i++) {
        soma = soma + (entradas_pesos[i].entrada * entrada_pesos[i].peso)

    }
    console.log("Soma: " + soma);
    return soma
}

function limiteRapido(soma) {
    // if (soma <= 0) {
    //     return -1
    // }else {
    //     return 1
    // }

    return soma <= 0 ? -1 : 1;
}

function funcaoRampa(soma) {
    if(soma < 0) {
        return 0;
    }else if(soma >= 0 && soma <= 1) {
        return soma;
    }else if(soma > 1) {
        return 1;
    }
}

function funcaoSigmoide(soma) {
    if (soma >= 0) {
        return 1 - 1 / (1 + soma);
    }else {
        return -1 + 1 / (1 - soma);
    }
}