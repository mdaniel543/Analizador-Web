FROM golang

WORKDIR /App

ADD . /App

COPY . .

ENV PORT 8080

ENV IP "192.168.0.0"

CMD ["go", "run", "main.go"]