const perguntas = [
    {
        pergunta: "É homem?",
        subElemento: {
            sim: {
                pergunta: "Ele joga futebol?",
                subElemento: {
                    sim: "Neymar",
                    nao: "Ayrton Senna"
                }
            },
            nao: {
                pergunta: "Ela é mulher?",
                subElemento: {
                    sim: {
                        pergunta: "Ela é modelo?",
                        subElemento: {
                            sim: "Gisele Bündchen",
                            nao: "Margot Robbie"
                        }
                    },
                    nao: {
                        pergunta: "É um personagem animado?",
                        subElemento: {
                            sim: {
                                pergunta: "É do Dragon Ball?",
                                subElemento: {
                                    sim: "Goku",
                                    nao: "Naruto"
                                }
                            },
                            nao: {
                                pergunta: "É um animal?",
                                subElemento: {
                                    sim: {
                                        pergunta: "O animal é o melhor amigo do homem?",
                                        subElemento: {
                                            sim: "Cachorro",
                                            nao: "Vaca"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
];

const arrayDeRespostasPossiveis = ["Neymar", "Ayrton Senna", "Gisele Bündchen", "Margot Robbie", "Goku", "Naruto", "Cachorro", "Vaca"];

// Informa ao usuário para ele pensar em uma das opções válidas
console.log("Pense em uma das opções abaixo para eu tentar adivinhar:");
arrayDeRespostasPossiveis.forEach(resposta => {
    console.log(resposta);
});

// Motor de inferência
const readline = require('readline');
const resposta = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fazPergunta(pergunta) {
    return new Promise(resolve => {
        resposta.question(pergunta, resposta => {
            resolve(resposta);
        });
    });
}

async function processarPerguntas(node) {
    if (typeof node === "string") {
        // Se chegamos a uma string, é a resposta final.
        console.log(`A resposta é: ${node}`);
        return true; // Indica que terminou
    }

    // Faz a pergunta e aguarda a resposta
    let respostaUsuario = await fazPergunta(node.pergunta + " (1 para SIM, 2 para NÃO):\n");

    if (respostaUsuario == 1 && node.subElemento.sim) {
        // Recursivamente processa a subárvore do "sim"
        return await processarPerguntas(node.subElemento.sim);
    } else if (respostaUsuario == 2 && node.subElemento.nao) {
        // Recursivamente processa a subárvore do "não"
        return await processarPerguntas(node.subElemento.nao);
    } else {
        // Se uma resposta inválida for dada
        console.log("Resposta inválida. Por favor, responda com 1 para SIM ou 2 para NÃO.");
        return await processarPerguntas(node);  // Refaz a mesma pergunta
    }
}

async function iniciarPerguntas(perguntas) {
    let encontrouResposta = false;
    // Processa todas as perguntas até encontrar uma resposta final
    for (const pergunta of perguntas) {
        encontrouResposta = await processarPerguntas(pergunta);
        if (encontrouResposta) break; // Para o loop se uma resposta final foi encontrada
    }
    resposta.close(); // Fecha o readline quando todas as perguntas forem feitas
}

// Inicia o processo de perguntas
iniciarPerguntas(perguntas);






