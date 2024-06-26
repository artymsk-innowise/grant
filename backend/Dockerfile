FROM node:18.16.0

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000 

CMD ["node", "dist/main.js"]
