# Start Tecnologia
Site: starktecnologia.com

## Estrutura de Pastas
```plaintext
/Users/victormuniz/Documents/projetos/stark/start-backend
├── prisma
│   ├── migrations
│   └── seeders
├── src
│   ├── infra
│   │   └── db
│   │   └── criptography
│   │   └── mailer
│   ├── routes
│   ├── middlewares
│   ├── presentations
│   │   └── controllers
│   │   └── helpers
│   │   └── interface
│   ├── servers
│   ├── services
└── README.md
```

### Descrição das Pastas

- **prisma**: Contém as migrações e seeders do banco de dados.
  - **migrations**: Scripts de migração do banco de dados.
  - **seeders**: Scripts para popular o banco de dados com dados iniciais.

- **src**: Diretório principal do código fonte.
  - **infra**: Implementação de funcionalidades de terceiros.
    - **db**: Configurações e instâncias do banco de dados.
    - **criptography**: Implementações de criptografia.
    - **mailer**: Configurações e serviços de envio de e-mails.
  - **routes**: Definição das rotas HTTP.
  - **middlewares**: Interceptadores de requisições HTTP.
  - **presentations**: Camada de apresentação e controle.
    - **controllers**: Processamento e exibição de respostas de requisições HTTP.
    - **helpers**: Funções auxiliares para a camada de apresentação.
    - **interface**: Definições de interfaces utilizadas na camada de apresentação.
  - **servers**: Funcionalidades extras do servidor de aplicação.
  - **services**: Implementação das regras de negócio e consultas ao banco de dados.

# O que é Prisma?

Prisma é um ORM (Object-Relational Mapping) moderno para Node.js e TypeScript. Ele facilita o gerenciamento do banco de dados, permitindo que você escreva consultas SQL de forma segura e eficiente usando uma API JavaScript/TypeScript. Prisma oferece uma série de ferramentas para trabalhar com bancos de dados, incluindo:

- **Prisma Client**: Um cliente gerado automaticamente que permite interagir com o banco de dados usando JavaScript/TypeScript.
- **Prisma Migrate**: Uma ferramenta de migração de banco de dados que ajuda a gerenciar o esquema do banco de dados ao longo do tempo.
- **Prisma Studio**: Uma interface gráfica para visualizar e editar dados no banco de dados.

# Instruções para Migrações com Prisma

### Criar uma nova migração

Para criar uma nova migração, use o comando abaixo. Substitua `nome-da-migracao` pelo nome desejado para a migração.

```bash
npx prisma migrate dev --name nome-da-migracao
```

### Aplicar migrações em desenvolvimento

Para aplicar as migrações no ambiente de desenvolvimento, use o comando:

```bash
npx prisma migrate dev
```

### Aplicar migrações em produção

Para aplicar as migrações no ambiente de produção, use o comando:

```bash
npx prisma migrate deploy
```

### Resetar o banco de dados

Para resetar o banco de dados e aplicar todas as migrações do zero, use o comando:

```bash
npx prisma migrate reset
```

**Atenção**: Este comando irá apagar todos os dados do banco de dados. Use com cuidado.

### Gerar o Prisma Client

Após criar ou aplicar migrações, é necessário gerar o Prisma Client para refletir as mudanças no código. Use o comando:

```bash
npx prisma generate
```

### Visualizar o banco de dados

Para visualizar o banco de dados e suas tabelas, use o Prisma Studio:

```bash
npx prisma studio
```

Seguindo essas instruções, você poderá gerenciar as migrações do banco de dados usando Prisma de forma eficiente.

# Como Rodar o Sistema

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como referência.

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:

```bash
npx prisma generate
```

6. Inicie o servidor:

```bash
npm run dev
```

# Como Fazer Deploy

### Pré-requisitos

- Servidor com Node.js instalado
- Banco de dados MySQL configurado

### Passos para Deploy

1. Faça o build do projeto:

```bash
npm run build
```

2. Transfira os arquivos para o servidor:

Você pode usar ferramentas como `scp` ou `rsync` para transferir os arquivos para o servidor.

3. Instale as dependências no servidor:

```bash
npm install --production
```

4. Configure as variáveis de ambiente no servidor:

Crie um arquivo `.env` no servidor e adicione as variáveis de ambiente necessárias.

5. Execute as migrações do banco de dados no servidor:

```bash
npx prisma migrate deploy
```

6. Gere o Prisma Client no servidor:

```bash
npx prisma generate
```

7. Inicie o servidor:

```bash
npm start
```

Seguindo essas instruções, você poderá rodar o sistema localmente e fazer o deploy em um servidor de produção.

