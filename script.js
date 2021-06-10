
//Declaração de variáveis globais
const container = document.querySelector('.container');
const main = document.getElementsByTagName('main')[0];
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const turnoJogador = document.getElementById('currentPlayer');
const resultado = document.getElementById('resultado');
const vencedor = document.getElementsByClassName('vitoria')[0];
const btnReset = document.getElementById('reset');
const btnStart = document.getElementById('start');
const btnMute = document.getElementById('mute');
const soundControl = document.getElementById('sound-control');
const volumeControl = document.getElementById('volume-control');
const sfx = document.getElementById('sfx');
const victoryTheme = document.getElementById('victoryTheme');
const backgroundMusic = document.getElementById('soundtrack');
btnReset.classList.add('botao')
sfx.volume = 0.25;
backgroundMusic.volume = 0.7;
victoryTheme.volume = 0.7;
sfx.playbackRate = 1.5;
backgroundMusic.loop = true;

//checar volume
setInterval(function(){  
    backgroundMusic.volume = volumeControl.value / 100;
    victoryTheme.volume = volumeControl.value / 100;
    sfx.volume = volumeControl.value / 300;
}, 500);


let modoMusica = true;
let turno = 1;
let tabuleiro = [[], [], [], [], [], [], []];

//Declaração de elementos HTML 1- createElements  2- classlist 3- append
for (let i = 0; i < 7; i++) {
    const coluna = document.createElement('div');
    coluna.classList.add('colunas');
    container.appendChild(coluna);
}

const colunas = document.querySelectorAll('.colunas');
colunas.forEach(coluna => {
    for (let i = 0; i < 6; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add('quadrados');
        coluna.appendChild(quadrado);
    }
})

const criarDisco = () => {
    const disco = document.createElement('div');
    disco.classList.add('disco');
    if (turno === 1) {
        disco.classList.add('sunSE');
        disco.dataset.cor = 'preto'
    } else if (turno === 2) {
        disco.classList.add('moonSE');
        disco.dataset.cor = 'vermelho'
    }
    return disco
}

//Declaração de Funções

//Função de Verificação de Vitória

//Outras funções

btnStart.addEventListener('click', () => {
    btnStart.classList.add('hidden');
    main.classList.remove('hidden');
    btnMute.classList.remove('hidden');
    soundControl.classList.remove('hidden');
    backgroundMusic.play();
})

btnMute.addEventListener('click', () => {
    if (modoMusica === true){
        backgroundMusic.muted = true;
        victoryTheme.muted = true;
        sfx.muted = true;
        modoMusica = false;
        btnMute.src = "./assets/images/mute.png"
    } else if (modoMusica === false){
        backgroundMusic.muted = false;
        victoryTheme.muted = false;
        sfx.muted = false;
        modoMusica = true;
        btnMute.src = "./assets/images/volume.png"
    }
    
    
})

const changeMusic = () =>{
    //parar musica de background
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    victoryTheme.currentTime = 0;
    victoryTheme.play();
}

const colunaCheia = () => {
    const cheio = document.createElement('div');
    cheio.classList.add('cheio');
    cheio.innerText = 'Seu disco foi capturado por um buraco negro';
    // main.insertBefore(cheio, container);
    resultado.appendChild(cheio);
    const cheia = document.getElementsByClassName('cheio')[0];
    setTimeout(() => { resultado.innerHTML = '' }, 1000);
}

const vitoriaSol = () => {
    const vencedor = document.createElement('div');
    vencedor.classList.add('vencedorSol');
    vencedor.innerHTML = `<h3>No dia mais claro...</h3><br><h2>o Sol venceu!</h2>`;
    resultado.appendChild(vencedor);
}

const vitoriaLua = () => {
    const vencedor = document.createElement('div');
    vencedor.classList.add('vencedorLua');
    vencedor.innerHTML = `<h3>Na noite mais densa...</h3><br><h2>a Lua venceu!</h2>`;
    resultado.appendChild(vencedor);
}

const eclipse = () => {
    const vencedor = document.createElement('div');
    vencedor.classList.add('empate');
    vencedor.innerHTML = `<h3>Nem Sol, nem Lua...</h3><br><h2>Eclipse!</h2>`;
    resultado.appendChild(vencedor);
}


//Verificação de Turno
const currentPlayer = () => {
    let atual = criarDisco();
    turnoJogador.appendChild(atual);
    if(turno === 1){
        player1.classList.add('playerturn')
        player2.classList.remove('playerturn')
    } else if (turno === 2){
        player1.classList.remove('playerturn')
        player2.classList.add('playerturn')
    }
} 
currentPlayer();

//Função do Handler
colunas.forEach((item) => {
    item.addEventListener('click', setColuna)
})

function setColuna(e) {
    sfx.pause()
    sfx.currentTime = 0;
    sfx.play();

    const colunaEscolhida = e.currentTarget;

    const quadrados = colunaEscolhida.querySelectorAll('.quadrados');

    let ultimoQuadrado = quadrados[quadrados.length - 1];

    if (ultimoQuadrado.childElementCount > 0) {
        colunaCheia();
        return;
    }

    let quadradoEscolhido

    for (let i = 0; i < quadrados.length; i++) {
        if (quadrados[i].childElementCount === 0) {
            quadradoEscolhido = quadrados[i];
            break;
        }
    }

    const discoCriado = criarDisco();

    quadradoEscolhido.appendChild(discoCriado);

    if (turno === 1) {
        turno = 2;
    }
    else if (turno === 2) {
        turno = 1
    }

    if (fimJogo()) {
        // console.log(fimJogo())
        btnReset.classList.remove('hidden');
        container.classList.add('hidden');
        // container.classList.add('hidden');
        return;
    };

    currentPlayer();
}

//Atualizar array de arrays
const verificarTabuleiro = () => {
    let newArray = [[], [], [], [], [], [], []];

    for (let i = 0; i < colunas.length; i++) {
        let quadrados = colunas[i].querySelectorAll('.quadrados')
        for (j = 0; j < quadrados.length; j++) {
            let discoPosicao = quadrados[j].firstElementChild
            if (discoPosicao === null) {
                break;
            }
            if (discoPosicao.dataset.cor === 'preto') {
                newArray[i].push(1)
            }
            if (discoPosicao.dataset.cor === 'vermelho') {
                newArray[i].push(2)

            }
        }
    }

    tabuleiro = newArray;
}


//Verificações de Vitória
//Verificação Horizontal

const verificarHorizontal = () => {

    for (let j = 0; j < 6; j++) {


        for (let i = 0; i < 4; i++) {


            let discoA = tabuleiro[i][j];
            let discoB = tabuleiro[i + 1][j];
            let discoC = tabuleiro[i + 2][j];
            let discoD = tabuleiro[i + 3][j];

            if (discoA === discoB && discoB === discoC && discoC === discoD) {
                if (discoA === 1) {
                    // vitoriaSol();
                    console.log('preto ganhou horizontal');
                    return 'preto'

                } else if (discoA === 2) {
                    // vitoriaLua();
                    console.log('vermelho ganhou horizontal');
                    return 'vermelho'
                }
            }
        }
    }

    return null;
}


//Verificação Vertical
const verificarVertical = () => {
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i].length > 3) {
            for (let j = 0; j < 3; j++) {
                let discoA = tabuleiro[i][j];
                let discoB = tabuleiro[i][j + 1];
                let discoC = tabuleiro[i][j + 2];
                let discoD = tabuleiro[i][j + 3];

                if (discoA === discoB && discoB === discoC && discoC === discoD) {
                    if (discoA === 1) {
                        // vitoriaSol();
                        console.log('preto ganhou');
                        return 'preto'
                    } else if (discoA === 2) {
                        // vitoriaLua();
                        console.log('vermelho ganhou');
                        return 'vermelho'
                    }
                }
            }
        }
    }

    return null;
}

//Verificação Diagonal
const verificarDiagonal = () => {
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {

            let discoA = tabuleiro[i][j];
            let discoB = tabuleiro[i + 1][j + 1];
            let discoC = tabuleiro[i + 2][j + 2];
            let discoD = tabuleiro[i + 3][j + 3];

            if (discoA === discoB && discoB === discoC && discoC === discoD) {
                if (discoA === 1) {
                    // vitoriaSol();
                    console.log('preto ganhou (diagonal)');
                    return 'preto'
                } else if (discoA === 2) {
                    // vitoriaLua();
                    console.log('vermelho ganhou (diagonal)');
                    return 'vermelho'
                }
            }
        }
    }

    for (let j = 0; j < 3; j++) {

        for (let i = 6; i > 2; i--) {

            let discoA = tabuleiro[i][j];
            let discoB = tabuleiro[i - 1][j + 1];
            let discoC = tabuleiro[i - 2][j + 2];
            let discoD = tabuleiro[i - 3][j + 3];

            if (discoA === discoB && discoB === discoC && discoC === discoD) {
                if (discoA === 1) {
                    // vitoriaSol();
                    console.log('preto ganhou (diagonal)');
                    return 'preto'
                } else if (discoA === 2) {
                    // vitoriaLua();
                    console.log('vermelho ganhou (diagonal)');
                    return 'vermelho'
                }
            }
        }
    }

    return null;
}

// verificação de empate 
const verificarEmpate = () => {
    let count = 0;

    tabuleiro.forEach(coluna => {
        if (coluna.length === 6) {
            count++;
        } else {
            return;
        }
    });

    if (count === 7) {
        return 'empate'
    }
}

const fimJogo = () => {
    
    turnoJogador.innerHTML = '';
    verificarTabuleiro();

    let vencedorVertical = verificarVertical();
    let vencedorHorizontal = verificarHorizontal();
    let vencedorDiagonal = verificarDiagonal();
    let empate = verificarEmpate();

    if (vencedorVertical === null && vencedorHorizontal === null && vencedorDiagonal === null && empate === null) {
        return false;
    }

    if (vencedorVertical === 'preto' || vencedorHorizontal === 'preto' || vencedorDiagonal === 'preto') {
        vitoriaSol();
        changeMusic();
        return true;
    }

    if (vencedorVertical === 'vermelho' || vencedorHorizontal === 'vermelho' || vencedorDiagonal === 'vermelho') {
        vitoriaLua();
        changeMusic();
        return true;
    }

    if (empate === 'empate') {
        eclipse();
        changeMusic();
        return true;
    }
}

const reset = () => {
    //parar som de vitória
    victoryTheme.pause();
    victoryTheme.currentTime = 0;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    btnReset.classList.add('hidden');
    resultado.innerHTML = '';

    turno = 1;
    tabuleiro = [[], [], [], [], [], [], []];

    const quadrados = document.querySelectorAll('.quadrados');

    quadrados.forEach(quadrado => quadrado.innerHTML = '');

    container.classList.remove('hidden');

    currentPlayer();
}

btnReset.addEventListener('click', reset);



/*

    0 - Inicial

    I - criar div no html (id = container) - div que guardará todos quadrados  (flex-direction = row)

    II - div de colunas (7 colunas flex column-reverse) em js // colunas appendadas no container

    <div id=col>
        <div = quadrado>
        <div = quadrado>
        <div = quadrado>
    </div>

    III - div de quadrados (6 quadrados) - Criar o tabuleiro (estrutura) html (divs menores) - deve ser criado no js

    //quadrados appendados na coluna

    estilo de altura, largura e borda > para as divs menores


    1 - Exiba um disco preto ou vermelho.

    Criar uma div de disco (em js)

    classe disco (altura, largura, border-radius), preto (background), vermelho (background)


    HADLERS  DE CLICK

    criar função para ser executada no click

    Função {
        criar um disco (objeto html) > createElement
        adicionar um estilo de disco (classList.add) (previamente definido no css)

        condição de turno{
            adicionar um estilo de cor (classList.add) (previamente definido no css)
            adicionar dataset relacionado a cor
        }


        append do disco na coluna que foi clicada

        Coluna Clicada > event.currentTarget
    }


    Reveze os turnos! Mude a cor do próximo disco após um disco ser adicionado.

    let turno = 1

       Condição de turno{
        if(turno === 1){}
        if(turno === 2){}
    }


    3 - Registre a cor dos discos em cada posição do tabuleiro. Você deve ser capaz de fazer o debug via console.log() depois de cada movimento mostrando o estado do tabuleiro.

    Criar um array de (7) arrays

    Criar uma função para atualizar o array de arrays (a partir do dataset dos discos)


    ex: 1 === preto         2 === vermelho


    array{
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
        {1,2,1,1,1,2}
    }

    4- condição de permissão de jogada
    Após encher uma coluna (6 discos), não permita que mais discos sejam adicionados.
    array[i][5] !== undefined


    Verifique se o último disco adicionado completou uma linha de quatro peças na coluna (verticalmente).

    Função verifiçãoVertical{
        verificar a partir do array de arrays se há 4 números iguais consecutivamente para um mesmo índice
    }


    Verifique se o último disco adicionado completou uma linha de quatro peças horizontalmente.

    Função verifiçãoHorizontal{
        verificar a partir do array de arrays se há 4 números iguais consecutivamente para um mesmo array
    }

    Verifique se o último disco adicionado completou uma linha de quatro peças em uma diagonal descendente ou ascendente.

    Função verifiçãoDiagonal{
        XXXX
    }


*/


