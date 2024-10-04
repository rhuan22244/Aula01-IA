let perguntas = [
    {
        identificador: "sabe-ligar-pc",
        pergunta: "você sabe o computador?",
        respostas: [
            {
                respostaPossivel: "sim"
            },
            {
                respostaPossivel: "não"
            }
        ]
    },
    {
        identificador: "liga-ou-da-tela-azul",
        pergunta: "ele liga normalmente e da tela azul ou reinicia inesperadamente?",
        respostas: [
            {
                respostaPossivel: "sim",
                redireciona: "identificar-problema-tela-azul-ou-reinicia"
            },
            {
                respostaPossivel: "não",
                redireciona: "verifica-sinal-de-video"
            }
        ]
    },
    {
        identificador: "verifica-sinal-de-video",
        pergunta: "ele da sinal de vida mas não da video, correto?",
        respostas: [
            {
                respostaPossivel: "sim",
                redireciona: "identifica-problema-video"
            },
            {
                respostaPossivel: "não",
                redireciona: "liga-ou-da-tela-azul"
            },
            {
                respostaPossivel: "não tem certeza",
                redireciona: "sabe ligar pc?"
            }
        ]
    },
    {
        identificador: "Verificar-pc-liga",
        pergunta: "O computador liga ou da algum sinal que esta ligado?",
        respostas: [
            {
                respostaPossivel: "sim"
                //dá algum sinal de vida
            },
            {
                respostaPossivel: "não"
                //não da sinal de vida
            },
            {
                respostaPossivel: "não tem certeza",
                //Verificar se a pessoa sabe o que é e como se tenta ligar um computador
                redireciona: "sabe-ligar-pc"
            },
        ]
    }
]