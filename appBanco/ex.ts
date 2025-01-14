
class Banco {
    private _contas: Conta[];
    private _clientes: Cliente[];
    private _idClienteAtual: number;
    private _idContaAtual: number;

    constructor() {
        this._contas = [];
        this._clientes = [];
        this._idClienteAtual = 0;
        this._idContaAtual = 0;
    }

    public inserirCliente(cliente: Cliente): void {
        cliente.id = this._idClienteAtual++
        this._clientes.push(cliente);
    }

    public inserirConta(conta: Conta) {
        conta.id = this._idContaAtual++;
        this._contas.push(conta);
    }

    public consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this._contas) {
            if (conta.numero == numero ) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    public consultarCliente(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this._clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
            }
        }
        return clienteProcurado;
    }

    public obterQuantidadeDeContas(): number {
        return this._contas.length;
    }

    public obterQuantidadeDeClientes(): number {
        return this._clientes.length;
    }

    private consultarContaPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    private consultarClientePorIndice(cpf: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._clientes.length; i++) {
            if (this._clientes[i].cpf == cpf) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    private excluirConta(numeroDaconta: string): void {
        let indiceContaProcurada: Number = this.consultarContaPorIndice(numeroDaconta)
    
        if (indiceContaProcurada != -1) {
            if (contaProcurada.cliente) {
                contaProcurada.cliente.contas = contaProcurada.cliente.contas.filter(conta => conta.numero != contaProcurada.numero)
                contaProcurada.cliente = undefined
                this.contas = this.contas.filter(conta => conta.numero != contaProcurada.numero)
            }
        }

        if (indiceContaProcurada != -1){
            for (let i = )
        }
    }

    private excluirCliente(cpf: string): void {
        let indiceClienteProcurado: Number = this.consultarClientePorIndice(cpf)
    
        if (!clienteProcurado) {
            console.log("Cliente não encontrado")
            return
        }
    
        for (let conta of clienteProcurado.contas) {
            conta.cliente = undefined
        }
    
        this.clientes = this.clientes.filter(outrosClientes => outrosClientes.cpf != clienteProcurado.cpf)
    }

    public alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    public sacar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    public depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    public transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultarConta(numeroOrigem);
        let contaDestino: Conta = this.consultarConta(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    public associarContaCliente(numeroConta: string, cpfCliente: string): void {
        let contaProcurada: Conta = this.consultarConta(numeroConta);
        let clienteProcurado: Cliente = this.consultarCliente(cpfCliente);

        if (contaProcurada && clienteProcurado) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.adicionarConta(contaProcurada);
        }
    }

    public jaExisteContaParaCliente(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
                jaExiste = true;
            } else {
                for (let contaAssociada of cliente.listarCopiaContas()) {
                    if (contaAssociada.numero == conta.numero) {
                        jaExiste = true;
                    }
                }
            }
        }

        return jaExiste;
    }

    public listarContasCliente(cpf: string): Conta[] {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let contas: Conta[] = [];

        if (clienteProcurado) {
            contas = clienteProcurado.listarCopiaContas();
        }
        return contas;
    }

    public renderJuros(numero: string) {
        let contaProcurada:Conta = this.consultarConta(numero);
        if (contaProcurada instanceof Poupanca) {
            //(contaProcurada as Poupanca).renderJuros(); em java é obrigatório o "cast"
            contaProcurada.renderJuros(); //em typescript já é feito o cast
        }
    }

    public totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let total: number = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.listarCopiaContas()) {
                total += conta.saldo;
            }
        }

        return total;
    }

    public obterTotalDinheiroDepositado(): number {
        let total: number = 0;

        for (let conta of this._contas) {
            total = total + conta.saldo;
        }
        return total ;
    }

    public calcularMediaSaldoContas(): number {
        return this.obterTotalDinheiroDepositado()/this.obterQuantidadeDeContas();
    }

    private mudarTitularidadeDaConta(conta: Conta, cpfNovoTitular: string): void {
    
        let contaProcurada = this.consultarConta(conta.numero);
        let novoTitular = this.consultarCliente(cpfNovoTitular);
    
        if (!contaProcurada || !novoTitular) {
            console.log("Conta ou cliente não encontrado!");
            return;
        }
    
        if (contaProcurada.cliente) {
            contaProcurada.cliente.contas = contaProcurada.cliente.contas.filter(outrasContas => outrasContas.numero !== conta.numero);
        }
    
        contaProcurada.cliente = novoTitular;
        novoTitular.contas.push(contaProcurada);
    }

}

class Cliente {
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _dataNascimento: Date;
    private _contas: Conta[];

    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this._id = 0;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }

    public set id(id: number) {
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public adicionarConta(contaProcurada: Conta) {
        this._contas.push(contaProcurada);
    }

    public listarCopiaContas(): Conta[] {
        let copiaContas: Conta[] = []

        for (let conta of this._contas) {
            let contaCopiada = new Conta(conta.numero, conta.saldo);
            contaCopiada.id = conta.id;

            copiaContas.push(contaCopiada)
        }

        return copiaContas;
    }
}

class Conta {
    private _id: number;
    private _numero: string;
    private _saldo: number;
    private _cliente!: Cliente;

    constructor(numero: string, saldo: number) {
        this._id = 0;
        this._numero = numero;
        this._saldo = saldo;  
    }

    public sacar(valor: number): void {
        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    public transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    
    public get id() : number {
        return this._id
    }
    
    public set id(id: number) {
        this._id = id;
    }

    public get numero(): string {
        return this._numero
    }

    public get saldo(): number {
        return this._saldo;
    }

    public get cliente(): Cliente {
        return this._cliente
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }

}

class Poupanca extends Conta {  
    private _taxaDeJuros: number;

    constructor(numero: string, saldo: number, taxaDeJuros: number) {
        super(numero,saldo);
        this._taxaDeJuros = taxaDeJuros;
    }

    public renderJuros() {
        let juros: number = this.saldo * this._taxaDeJuros/100;
        this.depositar(juros);        
    }
}

const itau : Banco = new Banco();

const luizPobreFudido = new Cliente("Luiz", "111-1", new Date("2005-01-06"))
const conta1DoLiso = new Conta("1", 2)
const conta2DoLiso = new Conta("2", 4)
luizPobreFudido.id = 1
conta1DoLiso.id = 11
conta2DoLiso.id = 22
conta1DoLiso.cliente = luizPobreFudido
conta2DoLiso.cliente = luizPobreFudido
luizPobreFudido.adicionarConta(conta1DoLiso)
luizPobreFudido.adicionarConta(conta2DoLiso)
console.log(luizPobreFudido.listarCopiaContas())

const aleatorio = new Cliente("aleatorio", "222-2", new Date("1-1-1"))
const conta1 = new Conta("3", 6)
const conta2 = new Conta("4", 8)
aleatorio.id = 2
conta1.id = 33
conta2.id = 44
conta1.cliente = aleatorio
conta2.cliente = aleatorio
aleatorio.adicionarConta(conta1)
aleatorio.adicionarConta(conta2)
console.log(aleatorio.listarCopiaContas())

itau.obterQuantidadeDeClientes()
itau.obterQuantidadeDeContas()
