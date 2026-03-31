# Usa Node.js oficial
FROM node:18

# Cria diretório da app
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta usada pelo Fly
EXPOSE 8080

# Arranca o servidor
CMD ["node", "index.js"]
