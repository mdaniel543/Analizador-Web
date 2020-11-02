FROM node

WORKDIR /usr/src/app

RUN npm install

RUN npm i express cors body-parser

EXPOSE 3000

CMD ["npm","run","start"]

COPY . .
