class Neuronio {
    constructor(numeroEntradas) {
        this.numeroEntradas = numeroEntradas; 
        this.pesos = [];

        for (let i = 0; i < numeroEntradas; i++) {
            this.pesos.push(Math.random());
        }
        this.bias = Math.random();
        this.taxaAprendizagem = 0.1;
    }

    somar(entrada) {
        let somaPonderada = this.bias;
        for (let i = 0; i < this.numeroEntradas; i++) { 
            somaPonderada += entrada[i] * this.pesos[i];
        }
        return somaPonderada;
    }

    ativacao(valor) {
        return valor < 0 ? 0 : 1;
    }

    processar(entrada) {
        let somaPonderada = this.somar(entrada);
        let saida = this.ativacao(somaPonderada);
        return saida;
    }

    ajustar(erro, entrada){
        for (let i = 0; i < this.numeroEntradas; i++) {
            this.pesos[i] += erro * entrada[i] * this.taxaAprendizagem;
        }
        this.bias += erro * this.taxaAprendizagem;
    }

    treinarRede(arrayTreinamento) {
        let ajustesNecessarios = true;

        while (ajustesNecessarios) {
            ajustesNecessarios = false;

            for (let i = 0; i < arrayTreinamento.length; i++) {
                const entrada = arrayTreinamento[i].entrada;
                const resultadoEsperado = arrayTreinamento[i].resultadoEsperado[0]; 
                const resultadoObtido = this.processar(entrada);
                const erro = resultadoEsperado - resultadoObtido;

                if (erro !== 0) {
                    ajustesNecessarios = true;
                    this.ajustar(erro, entrada);
                }
            }
        }
    }
}

const treinamento = [
    {entrada: [0, 0, 0], resultadoEsperado: [0]}, // Laranja - cítrico
    {entrada: [0, 0, 1], resultadoEsperado: [0]}, // Abacaxi - cítrico
    {entrada: [0, 1, 0], resultadoEsperado: [0]}, // Morango - cítrico
    {entrada: [0, 1, 1], resultadoEsperado: [0]}, // Kiwi - cítrico
    {entrada: [1, 0, 0], resultadoEsperado: [1]}, // Mamão - doce
    {entrada: [1, 0, 1], resultadoEsperado: [1]}, // Mamão - doce
    {entrada: [1, 1, 0], resultadoEsperado: [1]}, // Mamão - doce
    {entrada: [1, 1, 1], resultadoEsperado: [1]}, // Mamão - doce
];

let neuronio = new Neuronio(3); 
neuronio.treinarRede(treinamento);

let resultadoArray = ["Cítrico", "Doce"];

let resultado = neuronio.processar([0, 0, 0]);
console.log("A fruta informada é " + resultadoArray[resultado]);

console.log("Rede treinada com sucesso.");


