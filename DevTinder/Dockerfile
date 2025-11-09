FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install Python and build tools needed for bcrypt compilation
RUN apk add --no-cache python3 make g++

# Install all dependencies (bcrypt will compile from source)
RUN npm install

# 👇 dockerize install karo yahan
RUN apk add --no-cache wget \
 && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
 && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
 && rm dockerize-linux-amd64-v0.6.1.tar.gz

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]


