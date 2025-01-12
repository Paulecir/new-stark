import Web3 from 'web3';
import crypto from 'crypto';
import BalboaServices from './BaoboaService';

// Substitua pelo provedor correto (ex: Infura, Alchemy, etc.)
const web3 = new Web3('https://bsc-dataseed.binance.org/');

interface Wallet {
  encryptedPrivateKey: string;
  publicKey: unknown;
  address: unknown;
}

interface TransferRecipient {
  address: string;
  value: string;
}

export class Web3Services {
  private encryptionKey: string;

  constructor() {
    // Chave de criptografia (use variáveis de ambiente para armazená-la)
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'your-encryption-key';
  }

  // Método para criar uma carteira
  createWallet(): Wallet {
    // Gera uma chave privada aleatória de 32 bytes
    const privateKey = crypto.randomBytes(32).toString('hex');

    // Criptografa a chave privada
    const encryptedPrivateKey = this.encrypt(privateKey);

    // Deriva a chave pública e o endereço
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

    return {
      encryptedPrivateKey,
      publicKey: account.publicKey,
      address: account.address,
    };
  }

  // Método para criptografar dados
  private encrypt(data: string): string {
    const iv = crypto.randomBytes(16); // Vetor de inicialização
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted; // Concatena o IV com os dados criptografados
  }

  // Método para descriptografar dados
  private decrypt(encryptedData: string): string {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extrai o IV
    const encrypted = encryptedData.slice(32); // Extrai os dados criptografados
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // Método para enviar tokens
  async sendTokens(): Promise<void> {
    const from = {
      privateKey: 'b30b5ae5ed7076c857dbc813baf5dcada2b6e808b486258242ac0f70a919cd39',
      address: '0xa5636d8512bb836c7a4f3973b13562b99ac39bcf',
    };

    const to: TransferRecipient[] = [
      { address: '0x68130611a337a95FEf96270bd35FDb4787C03070', value: '10' },
      { address: '0xd8f4fABa5A8aEfD5056278ec8b113Ac9184Fc4DB', value: '20' },
      { address: '0xcF4b30e948b0eE75273979b349907842D8f1c701', value: '30' },
    ];

    const balboaService = new BalboaServices(); // Instancie seu serviço Balboa

    for (const recipient of to) {
      try {
        const response = await balboaService.transferTokens(
          from.privateKey,
          from.address,
          recipient.address,
          recipient.value
        );
        const hash = response.result;
        console.log(`Transaction: https://bscscan.com/tx/${hash}`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Aguarda 5 segundos
      } catch (error) {
        console.error('Error sending tokens:', error);
      }
    }
  }
}