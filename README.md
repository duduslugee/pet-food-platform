Pet Food Platform 🐾
===================

Bem-vindo ao Pet Food Platform, um sistema de e-commerce modular para venda de produtos para pets! Este projeto utiliza uma arquitetura de microserviços com Spring Boot no backend e React no frontend, tudo orquestrado com Docker. 🐶🐱

Sobre o Projeto
---------------
O Pet Food Platform é uma aplicação que permite:
- Gerenciar produtos (catálogo de rações e acessórios para pets).
- Cadastrar e autenticar usuários.
- Criar e gerenciar pedidos.
- Processar pagamentos (simulado).
- Acompanhar o histórico de pedidos.

O objetivo é criar uma solução escalável e modular, adequada para um ambiente de produção, com separação de responsabilidades entre os serviços e integração via REST.

Tecnologias Utilizadas
----------------------
- Backend: Spring Boot, MongoDB, RestTemplate
- Frontend: React, Axios, React Router, React Icons, React Toastify
- Orquestração: Docker, Docker Compose
- Linguagens: Java (backend), JavaScript (frontend)
- Documentação: Swagger/OpenAPI (para endpoints)

Arquitetura do Projeto
----------------------
A arquitetura é baseada em microserviços, com cada serviço tendo seu próprio banco de dados MongoDB para garantir desacoplamento. Os serviços se comunicam via REST.

- Frontend (React): Interface do usuário, acessível em http://localhost:3000.
- Catalog Service: Gerencia produtos (http://localhost:8081).
- User Service: Gerencia usuários e autenticação (http://localhost:8082).
- Order Service: Gerencia pedidos, integra-se com catalog-service e payment-service (http://localhost:8083).
- Payment Service: Simula processamento de pagamentos (http://localhost:8084).
- Bancos de Dados: Cada serviço tem um MongoDB independente (portas 27017 a 27020).

Diagrama da Arquitetura (Sugestão para Draw.io):
- Frontend (React) --> REST --> Catalog Service (MongoDB: catalog-db:27017)
- Frontend (React) --> REST --> User Service (MongoDB: user-db:27018)
- Frontend (React) --> REST --> Order Service (MongoDB: order-db:27019)
- Frontend (React) --> REST --> Payment Service (MongoDB: payment-db:27020)
- Order Service --> REST --> Catalog Service (para preços de produtos)
- Order Service --> REST --> Payment Service (para processar pagamento)
- Todos os serviços estão na rede Docker app-network.

Começando
---------
Siga as instruções abaixo para rodar o projeto localmente.

Pré-requisitos
--------------
- Docker e Docker Compose instalados
- Node.js (para desenvolvimento local do frontend, se necessário)
- Java 21 (para desenvolvimento local do backend, se necessário)
- Git instalado (para clonar o repositório)

Instalação
----------
1. Clone o Repositório
   git clone https://github.com/duduslugee/pet-food-platform.git
   cd pet-food-platform

2. Configurar o Ambiente
   - Certifique-se de que o Docker está rodando.
   - O projeto inclui um docker-compose.yml que configura todos os serviços.

3. Iniciar os Serviços
   docker-compose up --build
   Isso iniciará:
   - Frontend: http://localhost:3000
   - Catalog Service: http://localhost:8081
   - User Service: http://localhost:8082
   - Order Service: http://localhost:8083
   - Payment Service: http://localhost:8084
   - Bancos MongoDB: portas 27017 a 27020

4. Acessar o Frontend
   - Abra seu navegador e vá para http://localhost:3000.
   - Você verá a interface de login/cadastro ou a listagem de produtos (se já estiver logado).

Uso
---
1. Cadastro e Login
   - Acesse http://localhost:3000/register para criar uma conta (nome, email, senha).
   - Acesse http://localhost:3000/login para fazer login com email e senha.
   - Após o login, você será redirecionado para a página principal.

2. Listagem de Produtos
   - Na página inicial (http://localhost:3000), veja os produtos disponíveis.
   - Clique em "Detalhes" para ver mais informações sobre um produto.
   - Clique em "Adicionar ao Carrinho" para incluir produtos no carrinho.

3. Adicionar Produto (Admin)
   - Na página inicial, clique em "Adicionar Produto".
   - Preencha o formulário (ID, Nome, Tipo, Descrição, Peso, Preço, Disponível).
   - Clique em "Salvar Produto" para adicionar ao catálogo.

4. Carrinho e Finalização de Pedido
   - Acesse o carrinho em http://localhost:3000/cart.
   - Veja os produtos adicionados e o total.
   - Clique em "Finalizar Pedido" para criar um pedido (requer login).
   - O pedido será enviado ao order-service, que consultará o catalog-service para calcular o total e o payment-service para processar o pagamento (simulado).

5. Histórico de Pedidos
   - Acesse http://localhost:3000/orders (requer login).
   - Veja todos os pedidos associados ao seu usuário, incluindo status (PENDING, CONFIRMED, FAILED).

Testar Endpoints via API
- Use ferramentas como Postman para interagir diretamente com os microserviços.
- Exemplos:
  - Adicionar um produto (catalog-service):
    curl -X POST http://localhost:8081/products -H "Content-Type: application/json" -d '{"id":"3","name":"Ração para Gatos","type":"Gato","description":"Ração Premium","weight":5.0,"price":40.0,"available":true}'
  - Registrar um usuário (user-service):
    curl -X POST http://localhost:8082/users/register -H "Content-Type: application/json" -d '{"name":"João","email":"joao@example.com","password":"123456"}'
  - Criar um pedido (order-service):
    curl -X POST http://localhost:8083/orders -H "Content-Type: application/json" -d '{"userId":"user-id","productIds":["1","2"],"total":0,"status":"PENDING"}'
  - Consultar pedidos de um usuário (order-service):
    curl http://localhost:8083/orders/user/<user-id>

Documentação dos Endpoints (Swagger)
------------------------------------
Cada microserviço inclui suporte ao Swagger/OpenAPI para documentação dos endpoints:
- Catalog Service: http://localhost:8081/swagger-ui.html
- User Service: http://localhost:8082/swagger-ui.html
- Order Service: http://localhost:8083/swagger-ui.html
- Payment Service: http://localhost:8084/swagger-ui.html

Estrutura do Projeto
--------------------
pet-food-platform/
├── catalog-service/    # Microserviço para gerenciar produtos
│   ├── src/main/java/com/petfood/catalogservice/
│   │   ├── controller/ProductController.java
│   │   ├── model/Product.java
│   │   └── repository/ProductRepository.java
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── user-service/       # Microserviço para gerenciar usuários
│   ├── src/main/java/com/petfood/userservice/
│   │   ├── controller/UserController.java
│   │   ├── model/User.java
│   │   └── repository/UserRepository.java
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── order-service/      # Microserviço para gerenciar pedidos
│   ├── src/main/java/com/petfood/orderservice/
│   │   ├── controller/OrderController.java
│   │   ├── model/Order.java
│   │   ├── repository/OrderRepository.java
│   │   └── AppConfig.java
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── payment-service/    # Microserviço para gerenciar pagamentos
│   ├── src/main/java/com/petfood/paymentservice/
│   │   ├── controller/PaymentController.java
│   │   ├── model/Payment.java
│   │   └── repository/PaymentRepository.java
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/           # Aplicação React para o frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── OrderHistory.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml  # Configuração do Docker Compose
└── README.txt          # Documentação do projeto

Serviços Docker
---------------
| Serviço          | Porta  | Banco MongoDB   | Descrição                     |
|------------------|--------|-----------------|-------------------------------|
| frontend         | 3000   | -               | Interface React               |
| catalog-service  | 8081   | catalog-db:27017| Gerenciamento de produtos     |
| user-service     | 8082   | user-db:27018   | Gerenciamento de usuários     |
| order-service    | 8083   | order-db:27019  | Gerenciamento de pedidos      |
| payment-service  | 8084   | payment-db:27020| Gerenciamento de pagamentos   |

Endpoints Principais
--------------------
- Catalog Service (http://localhost:8081):
  - GET /products: Lista todos os produtos
  - GET /products/{id}: Detalhes de um produto
  - POST /products: Cria um novo produto
- User Service (http://localhost:8082):
  - POST /users/register: Registra um novo usuário
  - POST /users/login: Autentica um usuário
  - GET /users/{id}: Detalhes de um usuário
- Order Service (http://localhost:8083):
  - POST /orders: Cria um novo pedido
  - GET /orders/user/{userId}: Lista pedidos de um usuário
- Payment Service (http://localhost:8084):
  - POST /payments: Processa um pagamento (simulado)

Desenvolvimento
---------------
Rodar Apenas o Frontend Localmente
1. Navegue até o diretório do frontend:
   cd frontend
2. Instale as dependências:
   npm install
3. Inicie o servidor de desenvolvimento:
   npm start

Rodar Apenas um Microserviço Localmente
1. Certifique-se de que o MongoDB correspondente está rodando (ex.: via Docker).
2. Navegue até o diretório de um microserviço (ex.: catalog-service).
3. Inicie o serviço com Maven:
   cd catalog-service
   ./mvnw spring-boot:run

Solução de Problemas
--------------------
- Erro net::ERR_NAME_NOT_RESOLVED:
  - Certifique-se de que o frontend e os serviços estão usando http://localhost:<porta> para comunicação (ex.: http://localhost:8081 para catalog-service).
  - Verifique se todos os containers estão na mesma rede (app-network).
  - Exemplo: No OrderController.java, use http://localhost:8081 ao invés de http://catalog-service:8081.

- Serviço Não Inicia:
  - Verifique os logs do container:
    docker logs pet-food-platform-<service>-1
  - Certifique-se de que o MongoDB correspondente está saudável (ex.: catalog-db para catalog-service).

- Erro ao Fazer Push no GitHub:
  - Se encontrar "Updates were rejected", sincronize o repositório local com o remoto:
    git pull origin main --allow-unrelated-histories
    git push origin main

Contribuição
------------
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (git checkout -b feature/nova-funcionalidade).
3. Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade').
4. Push para a branch (git push origin feature/nova-funcionalidade).
5. Abra um Pull Request.

Licença
-------
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---
Feito com 💖 para amantes de pets! 🐕🐾