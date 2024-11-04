FROM golang:1.23.2


WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -v -o /server cmd/api/main.go

EXPOSE 3000

CMD ["/server"]