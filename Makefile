build:
	npm run build --prefix client/WeatherWise && go build -o bin/server ./cmd/api

run:
	npm run dev --prefix client/WeatherWise && air