FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /pw-tests

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]