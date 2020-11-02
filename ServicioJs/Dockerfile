FROM node

WORKDIR /App

ADD . /App

RUN npm install

RUN npm i express cors body-parser

ENV PORT 3000

ENV IP "192.168.0.0"

CMD ["npm","run","start"]

COPY . .
