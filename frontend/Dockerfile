# Usar uma imagem mais leve
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Iniciar a aplicação
CMD ["npm", "start"]