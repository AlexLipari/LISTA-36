class Torre {
    Nome: string
    Ataque: number
    Alcance: number
    Nivel: number
    Valor: number

    constructor(nome: string, ataque: number, alcance: number, nivel: number, valor: number) {
        this.SetNome(nome)
        this.SetAtaque(ataque)
        this.SetAlcanse(alcance)
        this.SetNivel(nivel)
        this.SetValor(valor)
    }
    SetNome(nome: string) {
        this.Nome = nome
    }
    GetNome() {
        return this.Nome
    }
    SetAtaque(ataque: number) {
        this.Ataque = ataque
    }
    GetAtaque() {
        return this.Ataque
    }
    SetAlcanse(alcance: number) {
        this.Alcance = alcance
    }
    GetAlcance() {
        return this.Alcance
    }
    SetNivel(nivel: number) {
        this.Nivel = nivel
    }
    GetNivel() {
        return this.Nivel
    }
    SetValor(valor: number) {
        this.Valor = valor
    }
    GetValor() {
        return this.Valor
    }

}
class Inimigo {
    Nome: string
    Vida: number

    constructor(nome: string, vida: number) {
        this.SetNome(nome)
        this.SetVida(vida)
    }
    SetNome(nome: string) {
        this.Nome = nome
    }
    GetNome() {
        return this.Nome
    }
    SetVida(vida: number) {
        this.Vida = vida
    }
    GetVida() {
        return this.Vida
    }
    ReceberDano(ataque: number) {
        this.Vida = this.Vida - ataque
    }
}
let torreArray: Torre[] = []
torreArray.length = 10
let inimigoArray: (Inimigo | number)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
inimigoArray.length = 10

AdicionarTorre(new Torre("T1", 3, 2, 2, 10), 5)

IniciarPartida(1)


function AdicionarTorre(torre: Torre, posicao: number) {
    torreArray[posicao] = torre
}
// console.log (torreArray ,inimigoArray)
function IniciarPartida(totalInimigos: number) {
    let vidas: number = 10
    let numeroInimigos = totalInimigos
    let inimigosMortos = 0
    let fimDoJogo: boolean = false
    do {
        numeroInimigos = numeroInimigos - MovimentacaoInimigo(numeroInimigos)
        vidas = vidas - VerificarAtaqueInimigo()
        inimigosMortos = inimigosMortos + VerificarAtaqueInimigo()
        inimigosMortos = inimigosMortos + AtaqueTorres()
        console.log("Restão ainda:", vidas, "vidas")
        if (vidas <= 0) {
            fimDoJogo = true
            console.log("Fim de Jogo, suas vidas acabaram ,perdeu!")
        } else if (inimigosMortos == totalInimigos) {
            fimDoJogo = true
            console.log("Fim de jogo, terrotou os inimigos, ganhou o jogo!")
        }
    } while (!fimDoJogo)
}
function MovimentacaoInimigo(numeroInimigos: number): number {
    inimigoArray.shift()
    if (numeroInimigos != 0) {
        inimigoArray[9] = new Inimigo("Sherec", 10)
        return 1
    } else {
        inimigoArray[9] = 0
    }
    return 0
}

function VerificarAtaqueInimigo(): number {
    if (inimigoArray[0] != 0)
        return 1
    return 0
}
function AtaqueTorres(): number {
    let inimigosMortos = 0
    torreArray.forEach((x, index) => {
        if (x.Alcance == 1) {
            if (inimigoArray[index] != 0) {
                return inimigosMortos = inimigosMortos + VerificarMortos(inimigoArray[index]!.ReceberDano(x.posicao), index)
            }
        } else {
            for (let i = index - (x.alcance - 1); i <= index + (x.alcance - 1); i++) {
                if (inimigoArray[i] != 0) {
                    return inimigosMortos = inimigosMortos + VerificarMortos(inimigoArray[i]!.ReceberDano(x.posicao), i)

                }
            }
        }
    })
    return inimigosMortos
}

function VerificarMortos(vida:number,posicao:number):number{
    if(vida <= 0){
        inimigoArray[posicao] = 0
        return  1
    }
    return 0
}