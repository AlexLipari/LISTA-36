var Torre = /** @class */ (function () {
    function Torre(nome, ataque, alcance, nivel, valor) {
        this.SetNome(nome);
        this.SetAtaque(ataque);
        this.SetAlcanse(alcance);
        this.SetNivel(nivel);
        this.SetValor(valor);
    }
    Torre.prototype.SetNome = function (nome) {
        this.Nome = nome;
    };
    Torre.prototype.GetNome = function () {
        return this.Nome;
    };
    Torre.prototype.SetAtaque = function (ataque) {
        this.Ataque = ataque;
    };
    Torre.prototype.GetAtaque = function () {
        return this.Ataque;
    };
    Torre.prototype.SetAlcanse = function (alcance) {
        this.Alcance = alcance;
    };
    Torre.prototype.GetAlcance = function () {
        return this.Alcance;
    };
    Torre.prototype.SetNivel = function (nivel) {
        this.Nivel = nivel;
    };
    Torre.prototype.GetNivel = function () {
        return this.Nivel;
    };
    Torre.prototype.SetValor = function (valor) {
        this.Valor = valor;
    };
    Torre.prototype.GetValor = function () {
        return this.Valor;
    };
    return Torre;
}());
var Inimigo = /** @class */ (function () {
    function Inimigo(nome, vida) {
        this.SetNome(nome);
        this.SetVida(vida);
    }
    Inimigo.prototype.SetNome = function (nome) {
        this.Nome = nome;
    };
    Inimigo.prototype.GetNome = function () {
        return this.Nome;
    };
    Inimigo.prototype.SetVida = function (vida) {
        this.Vida = vida;
    };
    Inimigo.prototype.GetVida = function () {
        return this.Vida;
    };
    Inimigo.prototype.ReceberDano = function (ataque) {
        this.Vida = this.Vida - ataque;
    };
    return Inimigo;
}());
var torreArray = [];
torreArray.length = 10;
var inimigoArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
inimigoArray.length = 10;
AdicionarTorre(new Torre("T1", 3, 2, 2, 3), 5);
IniciarPartida(1);
function AdicionarTorre(torre, posicao) {
    torreArray[posicao] = torre;
}
// console.log (torreArray ,inimigoArray)
function IniciarPartida(totalInimigos) {
    var vidas = 10;
    var numeroInimigos = totalInimigos;
    var inimigosMortos = 0;
    var fimDoJogo = false;
    do {
        numeroInimigos = numeroInimigos - MovimentacaoInimigo(numeroInimigos);
        vidas = vidas - VerificarAtaqueInimigo();
        inimigosMortos = inimigosMortos + VerificarAtaqueInimigo();
        inimigosMortos = inimigosMortos + AtaqueTorres();
        console.log("Restão ainda:", vidas, "vidas");
        if (vidas <= 0) {
            fimDoJogo = true;
            console.log("Fim de Jogo, suas vidas acabaram ,perdeu!");
        }
        else if (inimigosMortos == totalInimigos) {
            fimDoJogo = true;
            console.log("Fim de jogo, terrotou os inimigos, ganhou o jogo!");
        }
    } while (!fimDoJogo);
}
function MovimentacaoInimigo(numeroInimigos) {
    inimigoArray.shift();
    if (numeroInimigos != 0) {
        inimigoArray[9] = new Inimigo("Sherec", 10);
        return 1;
    }
    else {
        inimigoArray[9] = 0;
    }
    return 0;
}
function VerificarAtaqueInimigo() {
    if (inimigoArray[0] != 0)
        return 1;
    return 0;
}
function AtaqueTorres() {
    var inimigosMortos = 0;
    torreArray.forEach(function (x, index) {
        if (x.Alcance == 1) {
            if (inimigoArray[index] != 0) {
                return inimigosMortos = inimigosMortos + VerificarMortos(inimigoArray[index].ReceberDano(x.posicao), index);
            }
        }
        else {
            for (var i = index - (x.alcance - 1); i <= index + (x.alcance - 1); i++) {
                if (inimigoArray[i] != 0) {
                    return inimigosMortos = inimigosMortos + VerificarMortos(inimigoArray[i].ReceberDano(x.posicao), i);
                }
            }
        }
    });
    return inimigosMortos;
}
function VerificarMortos(vida, posicao) {
    if (vida <= 0) {
        inimigoArray[posicao] = 0;
        return 1;
    }
    return 0;
}
