FROM golang:1.23.2-alpine


WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=1 GOOS=linux go build -v -o server cmd/api/main.go

EXPOSE 3000

CMD ["server"]