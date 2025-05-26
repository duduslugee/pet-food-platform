Pet Food Platform 🐾
===================

Bem-vindo ao Pet Food Platform, um sistema de e-commerce modular para venda de produtos para pets! Este projeto utiliza uma arquitetura de microserviços com Spring Boot no backend e React no frontend, tudo orquestrado com Docker. 🐶🐱

Sobre o Projeto
---------------
O Pet Food Platform é uma aplicação que permite:
- Gerenciar produtos (catálogo de rações e acessórios para pets).
- Criar e gerenciar pedidos.
- Processar pagamentos.
- Gerenciar usuários.

Tecnologias Utilizadas
----------------------
- Backend: Spring Boot, MongoDB
- Frontend: React, Axios, React Icons, React Toastify
- Orquestração: Docker, Docker Compose
- Linguagens: Java (backend), JavaScript (frontend)

Começando
---------
Siga as instruções abaixo para rodar o projeto localmente.

Pré-requisitos
--------------
- Docker e Docker Compose instalados
- Node.js (para desenvolvimento local do frontend, se necessário)
- Java 21 (para desenvolvimento local do backend, se necessário)

Instalação
----------
1. Clone o Repositório
   git clone https://github.com/seu-usuario/pet-food-platform.git
   cd pet-food-platform

2. Configurar o Ambiente
   - Certifique-se de que o Docker está rodando.
   - O projeto já inclui um docker-compose.yml que configura todos os serviços.

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
   - Você verá a interface de listagem de produtos.

Uso
---
Adicionar um Produto
1. Na página inicial (http://localhost:3000), clique em "Adicionar Produto".
2. Preencha o formulário:
   - ID: Um identificador único (ex.: 3)
   - Nome: Nome do produto (ex.: Ração para Gatos)
   - Tipo: Tipo de pet (ex.: Gato)
   - Descrição: Detalhes do produto
   - Peso: Em kg (ex.: 5)
   - Preço: Em reais (ex.: 40)
   - Disponível: Marque o checkbox se disponível
3. Clique em "Salvar Produto".
4. O produto será adicionado ao catálogo e exibido na lista.

Testar via API
- Use ferramentas como Postman para interagir diretamente com os microserviços.
- Exemplo: Adicionar um produto via catalog-service:
  curl -X POST http://localhost:8081/products -H "Content-Type: application/json" -d '{"id":"3","name":"Ração para Gatos","type":"Gato","description":"Ração Premium","weight":5.0,"price":40.0,"available":true}'

Estrutura do Projeto
--------------------
pet-food-platform/
├── catalog-service/    # Microserviço para gerenciar produtos
├── user-service/       # Microserviço para gerenciar usuários
├── order-service/      # Microserviço para gerenciar pedidos
├── payment-service/    # Microserviço para gerenciar pagamentos
├── frontend/           # Aplicação React para o frontend
├── docker-compose.yml  # Configuração do Docker Compose
└── README.txt          # Documentação do projeto

Serviços Docker
---------------
| Serviço          | Porta  | Descrição                     |
|------------------|--------|-------------------------------|
| frontend         | 3000   | Interface React               |
| catalog-service  | 8081   | Gerenciamento de produtos     |
| user-service     | 8082   | Gerenciamento de usuários     |
| order-service    | 8083   | Gerenciamento de pedidos      |
| payment-service  | 8084   | Gerenciamento de pagamentos   |
| catalog-db       | 27017  | MongoDB para produtos         |
| user-db          | 27018  | MongoDB para usuários         |
| order-db         | 27019  | MongoDB para pedidos          |
| payment-db       | 27020  | MongoDB para pagamentos      |

Desenvolvimento
---------------
Rodar Apenas o Frontend Localmente
1. Navegue até o diretório do frontend:
   cd frontend
2. Instale as dependências:
   npm install
3. Inicie o servidor de desenvolvimento:
   npm start

Rodar Apenas o Backend Localmente
1. Certifique-se de que o MongoDB está rodando (ex.: via Docker).
2. Navegue até o diretório de um microserviço (ex.: catalog-service).
3. Inicie o serviço com Maven:
   cd catalog-service
   ./mvnw spring-boot:run

Solução de Problemas
--------------------
- Erro net::ERR_NAME_NOT_RESOLVED:
  - Certifique-se de que o frontend está usando http://localhost:8081 para acessar o catalog-service, e não http://catalog-service:8081.
  - Verifique se todos os containers estão na mesma rede (app-network).

- Serviço Não Inicia:
  - Verifique os logs do container:
    docker logs pet-food-platform-<service>-1

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