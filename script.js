
//Declaração de variáveis globais
const container = document.getElementById('container');
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
        disco.classList.add('preto');
        disco.dataset.cor = 'preto'
    } else if (turno === 2) {
        disco.classList.add('vermelho');
        disco.dataset.cor = 'vermelho'
    }
    return disco
}

//Declaração de Funções
//Outras funções


//Verificação de Turno



//Função do Handler
colunas.forEach((item) => {
    item.addEventListener('click', setColuna)
})


/*

colunas = array de COLUNA
COLUNA tem 6 quadrado

o append do disco tem que ser ao quadrado (primeiro quadrado sem filho)
*/





function setColuna(e) {
    const colunaEscolhida = e.currentTarget;

    const quadrados = colunaEscolhida.querySelectorAll('.quadrados');

    //criar condição de verificação de jogada possível

    let ultimoQuadrado = quadrados[quadrados.length - 1];

    if (ultimoQuadrado.childElementCount > 0) {
        console.log('Coluna cheia');
        return
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
    verificarTabuleiro();
    //condições de vitória
    verificarVertical();
    verificarDiagonal();
}


//Verificação de permissão de jogada



//Atualizar array de arrays
const verificarTabuleiro = () => {
    let newArray = [[], [], [], [], [], [], []];
    //percorrer colunas (7) da (do container) esquerda para direita (cada coluna é um array de NEWARRAY)
    //percorrer quadrados da coluna(6) aplicando a condição e dando push no NEWARRAY.

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
    console.log(tabuleiro)
}


//Verificações de Vitória
//Verificação Horizontal


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
                        console.log('preto ganhou');
                        // função de vitoria do preto
                    } else if (discoA === 2) {
                        console.log('vermelho ganhou');
                        // função de vitoria do vermelho
                    }
                }
            }
        }
    }
}


        //dados [i][j]
        //primeiro FOR percorrer até [0,0] [3,0] i vai de 0 a 3


        //Verificação Diagonal
        const verificarDiagonal = () => {

            //percorrendo colunas para cima /\
            for(let j = 0; j < 3; j++){

            //percorrendo colunas para a direita >>
                for(let i = 0; i < 4; i++){

                let discoA = tabuleiro[i][j];
                let discoB = tabuleiro[i + 1][j + 1];
                let discoC = tabuleiro[i + 2][j + 2];
                let discoD = tabuleiro[i + 3][j + 3];

                    if (discoA === discoB && discoB === discoC && discoC === discoD) {
                        if (discoA === 1) {
                            console.log('preto ganhou (diagonal)');
                            // função de vitoria do preto
                        } else if (discoA === 2) {
                            console.log('vermelho ganhou (diagonal)');
                            // função de vitoria do vermelho
                        }
                    }
                }
            }          

            //percorrendo colunas para cima /\
            for(let j = 0; j < 3; j++){

            //percorrendo colunas para a direita >>
                for(let i = 6; i > 2; i--){

                let discoA = tabuleiro[i][j];
                let discoB = tabuleiro[i - 1][j + 1];
                let discoC = tabuleiro[i - 2][j + 2];
                let discoD = tabuleiro[i - 3][j + 3];

                    if (discoA === discoB && discoB === discoC && discoC === discoD) {
                        if (discoA === 1) {
                            console.log('preto ganhou (diagonal)');
                            // função de vitoria do preto
                        } else if (discoA === 2) {
                            console.log('vermelho ganhou (diagonal)');
                            // função de vitoria do vermelho
                        }
                    }
                }
            }
        }




          /*  
            let discoA = tabuleiro[i][j];
            let discoB = tabuleiro[i + 1][j + 1];
            let discoC = tabuleiro[i + 2][j + 2];
            let discoD = tabuleiro[i + 3][j + 3];

                if (discoA === discoB && discoB === discoC && discoC === discoD) {
                    if (discoA === 1) {
                        console.log('preto ganhou (diagonal)');
                        // função de vitoria do preto
                    } else if (discoA === 2) {
                        console.log('vermelho ganhou (diagonal)');
                        // função de vitoria do vermelho
                    }
                }
            }


        }*/
        /*
        [0,0] [1,1] [2,2] [3,3]

        // alterando o eixo vertical 1++
        [0,1] [1,2] [2,3] [3,4]
        [0,2] [1,3] [2,4] [3,5]

        //alterando o eixo horizontal 1++
        [1,0]
        */
        /*

        coluna >>>>>>>
        linha \/

        array{
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
            {1,2,1,1,1,2}
        }
        */







//Declaração de Handlers


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


