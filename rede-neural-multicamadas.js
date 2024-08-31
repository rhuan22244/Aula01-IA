class RedeNeural {
    constructor(tamanhoEntrada, tamanhoOculto, tamanhoSaida) {
        this.tamanhoEntrada = tamanhoEntrada;
        this.tamanhoOculto = tamanhoOculto;
        this.tamanhoSaida = tamanhoSaida;

        // Inicializando pesos aleatórios para a camada oculta e a camada de saída
        this.pesosEntradaOculto = this.inicializarPesos(tamanhoEntrada, tamanhoOculto);
        this.pesosOcultoSaida = this.inicializarPesos(tamanhoOculto, tamanhoSaida);
    }

    // Função para inicializar os pesos com valores aleatórios
    inicializarPesos(linhas, colunas) {
        let pesos = [];
        for (let i = 0; i < linhas; i++) {
            let linhaPesos = [];
            for (let j = 0; j < colunas; j++) {
                linhaPesos.push(Math.random() * 2 - 1); // valores entre -1 e 1
            }
            pesos.push(linhaPesos);
        }
        return pesos;
    }

    // Função sigmoide e sua derivada
    sigmoide(x) {
        return 1 / (1 + Math.exp(-x));
    }

    derivadaSigmoide(x) {
        return x * (1 - x);
    }

    // Feedforward: Propagação das entradas através da rede
    feedforward(entrada) {
        this.entrada = entrada;

        // Camada oculta
        this.saidaOculta = this.multiplicarMatriz(entrada, this.pesosEntradaOculto).map(x => this.sigmoide(x));  // usando arrow function para garantir o contexto do `this`

        // Camada de saída
        this.saidaFinal = this.multiplicarMatriz(this.saidaOculta, this.pesosOcultoSaida).map(x => this.sigmoide(x));

        return this.saidaFinal;
    }

    // Função para calcular o erro (diferente esperado e atual)
    calcularErro(saidaEsperada, saidaFinal) {
        return saidaEsperada.map((esperada, i) => esperada - saidaFinal[i]);
    }

    // Ajustar pesos baseado no erro e na saída
    ajustarPesos(pesos, ajustes, saida, taxaAprendizagem) {
        for (let i = 0; i < pesos.length; i++) {
            for (let j = 0; j < pesos[i].length; j++) {
                pesos[i][j] += taxaAprendizagem * ajustes[j] * saida[i];
            }
        }
    }

    // Backpropagation: Ajuste dos pesos com base no erro
    treinar(entrada, saidaEsperada, taxaAprendizagem) {
        this.feedforward(entrada);

        // Calculando o erro da camada de saída
        let erroSaida = this.calcularErro(saidaEsperada, this.saidaFinal);

        // Calculando os ajustes para os pesos da camada de saída
        let ajustesSaida = erroSaida.map((erro, i) => erro * this.derivadaSigmoide(this.saidaFinal[i]));

        // Ajuste dos pesos da camada oculta para a camada de saída
        this.ajustarPesos(this.pesosOcultoSaida, ajustesSaida, this.saidaOculta, taxaAprendizagem);

        // Calculando o erro da camada oculta
        let erroOculto = [];
        for (let i = 0; i < this.pesosOcultoSaida.length; i++) {
            let erro = 0;
            for (let j = 0; j < ajustesSaida.length; j++) {
                erro += ajustesSaida[j] * this.pesosOcultoSaida[i][j];
            }
            erroOculto.push(erro);
        }

        // Calculando os ajustes para os pesos da camada de entrada para a camada oculta
        let ajustesOculto = erroOculto.map((erro, i) => erro * this.derivadaSigmoide(this.saidaOculta[i]));

        // Ajuste dos pesos da camada de entrada para a camada oculta
        this.ajustarPesos(this.pesosEntradaOculto, ajustesOculto, entrada, taxaAprendizagem);
    }

    // Função auxiliar para multiplicar matrizes (incluindo verificação de dimensões)
    multiplicarMatriz(vetor, matriz) {
        if (vetor.length !== matriz.length) {
            throw new Error("Dimensões incompatíveis para multiplicação.");
        }
        let resultado = [];
        for (let j = 0; j < matriz[0].length; j++) {
            let soma = 0;
            for (let i = 0; i < vetor.length; i++) {
                soma += vetor[i] * matriz[i][j];
            }
            resultado.push(soma);
        }
        return resultado;
    }

    // Função para treinar a rede com múltiplas iterações
    treinarRede(dadosTreinamento, iteracoes, taxaAprendizagem) {
        for (let i = 0; i < iteracoes; i++) {
            dadosTreinamento.forEach(dados => {
                this.treinar(dados.entrada, dados.saida, taxaAprendizagem);
            });
        }
    }
}

// Exemplo de uso

// Criando uma rede neural com 3 neurônios na entrada, 4 na camada oculta e 1 na saída
// let rede = new RedeNeural(3, 4, 1);

// // Dados de treinamento: entradas e saídas esperadas
// let treinamento = [
//     { entrada: [0, 0, 0], saida: [0] },
//     { entrada: [0, 0, 1], saida: [0] },
//     { entrada: [0, 1, 0], saida: [0] },
//     { entrada: [0, 1, 1], saida: [0] },
//     { entrada: [1, 0, 0], saida: [1] },
//     { entrada: [1, 0, 1], saida: [1] },
//     { entrada: [1, 1, 0], saida: [1] },
//     { entrada: [1, 1, 1], saida: [1] }
// ];

// // Treinando a rede por 10.000 iterações
// rede.treinarRede(treinamento, 10000, 0.1);

// // Testando a rede
// console.log(rede.feedforward([0, 0, 0]));  // Espera-se uma saída próxima de 0
// console.log(rede.feedforward([1, 1, 1]));  // Espera-se uma saída próxima de 1

let treinamento = [
    // Número 0
    {
        entrada: [
            [0,0,1,1,1,0],
            [0,1,0,0,0,1],
            [0,1,0,0,0,1],
            [0,1,0,0,0,1],
            [0,1,0,0,0,1],
            [0,1,0,0,0,1],
            [0,1,0,0,0,1],
            [0,0,1,1,1,0]
        ],
        resultadoEsperado: [1,0,0,0,0,0,0,0,0,0]
    },
    // Número 1
    {
        entrada: [
            [0,0,0,1,0,0],
            [0,0,1,1,0,0],
            [0,1,0,1,0,0],
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [0,1,1,1,1,1]
        ],
        resultadoEsperado: [0,1,0,0,0,0,0,0,0,0]
    },
    // Número 2
    {
        entrada: [
            [0,1,1,1,1,0],
            [1,0,0,0,0,1],
            [0,0,0,0,1,0],
            [0,0,0,1,0,0],
            [0,0,1,0,0,0],
            [0,1,0,0,0,0],
            [1,0,0,0,0,0],
            [1,1,1,1,1,1]
        ],
        resultadoEsperado: [0,0,1,0,0,0,0,0,0,0]
    },
    // Número 3
    {
        entrada: [
            [1,1,1,1,1,0],
            [0,0,0,0,0,1],
            [0,0,0,0,1,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [1,1,1,1,1,0]
        ],
        resultadoEsperado: [0,0,0,1,0,0,0,0,0,0]
    },
    // Número 4
    {
        entrada: [
            [0,0,0,0,1,0],
            [0,0,0,1,1,0],
            [0,0,1,0,1,0],
            [0,1,0,0,1,0],
            [1,1,1,1,1,1],
            [0,0,0,0,1,0],
            [0,0,0,0,1,0],
            [0,0,0,0,1,0]
        ],
        resultadoEsperado: [0,0,0,0,1,0,0,0,0,0]
    },
    // Número 5
    {
        entrada: [
            [1,1,1,1,1,1],
            [1,0,0,0,0,0],
            [1,1,1,1,1,0],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,1,1,1,1,0]
        ],
        resultadoEsperado: [0,0,0,0,0,1,0,0,0,0]
    },
    // Número 6
    {
        entrada: [
            [0,0,1,1,1,0],
            [0,1,0,0,0,0],
            [1,0,0,0,0,0],
            [1,1,1,1,1,0],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,1,1,1,1,0]
        ],
        resultadoEsperado: [0,0,0,0,0,0,1,0,0,0]
    },
    // Número 7
    {
        entrada: [
            [1,1,1,1,1,1],
            [0,0,0,0,0,1],
            [0,0,0,0,1,0],
            [0,0,0,0,1,0],
            [0,0,0,1,0,0],
            [0,0,0,1,0,0],
            [0,0,1,0,0,0],
            [0,0,1,0,0,0]
        ],
        resultadoEsperado: [0,0,0,0,0,0,0,1,0,0]
    },
    // Número 8
    {
        entrada: [
            [0,1,1,1,1,0],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,1,1,1,1,0],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,1,1,1,1,0]
        ],
        resultadoEsperado: [0,0,0,0,0,0,0,0,1,0]
    },
    // Número 9
    {
        entrada: [
            [0,1,1,1,1,0],
            [1,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,1,1,1,1,1],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [0,0,0,0,0,1],
            [0,1,1,1,1,0]
        ],
        resultadoEsperado: [0,0,0,0,0,0,0,0,0,1]
    }
];

let rede = new RedeNeural(48,96,10);

for(let i =  0; i < 10000; i++) {
    for(let dados of treinamento) {
        rede.treinar(dados.entrada.flat(),dados.resultadoEsperado,0.1);
    }
}

const numeroParaTestar = [
    [0,0,1,1,1,0],
    [0,1,0,0,0,0],
    [1,0,0,0,0,0],
    [1,1,1,1,1,0],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [0,1,1,1,1,0]
]

let resultado = rede.feedforward(numeroParaTestar.flat());
console.log("resultado",resultado);
