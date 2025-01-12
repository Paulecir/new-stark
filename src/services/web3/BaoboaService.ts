import Web3 from 'web3';

export class BalboaServices {
  private rpcUrl: string;
  private contractAddress: string;
  private decimals: number;
  private gasLimit: string;
  private gasPrice: string;
  private web3: Web3;

  constructor() {
    // Configuração da rede e do contrato do token
    this.rpcUrl = "https://bsc-dataseed.binance.org/"; 
    this.contractAddress = "0x1BAB34c61Ff8Bb877e8f68ab6a347e36837532b5"; // Endereço do contrato do token BALBOA
    this.decimals = 18; // Decimais corretos para o token BALBOA
    this.gasLimit = Web3.utils.toHex(100000); // 100000 em decimal
    this.gasPrice = Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')); // 1 Gwei em hexadecimal
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
  }

  public async transferTokens(privateKey: string, fromAddress: string, toAddress: string, amount: string): Promise<any> {
    // Valida o endereço de destino
    if (!this.isAddressValid(toAddress)) {
      throw new Error("Endereço de destino inválido.");
    }

    // Converte o valor para o formato correto em unidades Wei, de acordo com os decimais do token
    const value = BigInt(amount) * BigInt(10 ** this.decimals);

    // Codifica o endereço de destino e o valor na função "transfer" do contrato ERC-20/BEP-20
    const data = this.web3.eth.abi.encodeFunctionCall({
      name: "transfer",
      type: "function",
      inputs: [
        { type: "address", name: "to" },
        { type: "uint256", name: "value" }
      ]
    }, [toAddress, value.toString()]);

    // Obter nonce da conta para a transação
    const nonce = await this.getNonce(fromAddress);

    // Cria a transação
    const tx = {
      nonce: this.web3.utils.toHex(nonce),
      gasPrice: this.gasPrice,
      gasLimit: this.gasLimit,
      to: this.contractAddress,
      value: '0x0',
      data: data,
      chainId: 56 // 1 para Ethereum, 56 para BSC
    };

    // Assina a transação com a chave privada
    const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);

    // Envia a transação assinada para a rede
    return this.sendTransaction(signedTx.rawTransaction!);
  }

  private isAddressValid(address: string): boolean {
    // Verifica se o endereço é válido
    return this.web3.utils.isAddress(address);
  }

  private async getNonce(address: string): Promise<any> {
    // Consulta o nonce atual do endereço usando o nó RPC
    return await this.web3.eth.getTransactionCount(address, 'latest');
  }

  private async sendTransaction(signedTx: string): Promise<any> {
    // Envia a transação assinada para a rede usando o nó RPC
    try {
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx);
      return receipt;
    } catch (error: any) {
      throw new Error(`Erro ao enviar transação: ${error.message}`);
    }
  }
}

export default BalboaServices;
