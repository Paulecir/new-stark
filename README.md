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

# Regras do binário

### Posicionamento

Regras:
- Somente na compra do Token ONE, Token Teem e Win Win.
- Se o patrocinador estiver posicionado, ele definirá se você irá para a direita ou esquerda.
- Se o patrocinador não estiver posicionado, será feita uma busca recursiva até encontrar um patrocinador posicionado, que definirá o seu posicionamento.

### Qualificação

Regras:
- As posições da esquerda e direita devem ser preenchidas e ambas devem possuir o produto Win Win (é necessário ter 1 direto com Win Win na esquerda e 1 direto com Win Win na direita).

### Pontuação

Regras:
- Ao comprar o produto Win Win, a pontuação sobe no valor de 100% do valor do produto.
- Ao comprar o produto Token Teem, a pontuação sobe no valor de 50% do valor do produto.
- Ao comprar o produto Token One, a pontuação sobe no valor de 50% do valor do produto.

### Limite de ganho diário

Regras:
- A soma será (100% do valor do produto Win Win) + (50% do valor do produto Token Teem) + (50% do valor do produto Token One). Desse valor, será definido o limite diário de pagamento.
- Deverá ser pago 10% do valor da perna com o menor valor acumulado.
- A pessoa deverá estar qualificada respeitando o item qualificação. Caso não esteja, a pontuação será descontada, mas o valor não será pago.
- Caso a soma de (25% do produto Win Win) + (25% do produto Token Teem) + (25% do produto Token One) seja maior que a soma dos pagamentos, deverá ser calculada a porcentagem de diferença para descontar de todos os pagamentos a serem feitos.

