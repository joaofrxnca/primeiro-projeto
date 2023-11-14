let listaNumerosSorteados = [];
let limiteNumeros = 10;
let numeroAleatorio = gerarNumeroAleatorio ();
let tentativas = 1;

function elementosVisuais (tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
mensagemInicial ();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroAleatorio) {
        elementosVisuais ('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        elementosVisuais ('p', mensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute ('disabled');
    } else {
        if (chute > numeroAleatorio) {
            elementosVisuais ('p', 'O número secreto é menor');
        } else {
            elementosVisuais('p', 'O número secreto é maior');
        }
        tentativas ++;
        limparCampo ();
    }
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeros + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == limiteNumeros) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log (listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroAleatorio = gerarNumeroAleatorio ();
    tentativas = 1;
    limparCampo ();
    mensagemInicial ();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

function mensagemInicial () {
    elementosVisuais ('h1', 'Desafio do número misterioso!');
    elementosVisuais ('p', 'Digite um número de 0 a 10');
}