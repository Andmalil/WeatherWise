package cash

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

type Cash struct {
	Ctx      context.Context
	Client   *redis.Client
	Addr     string
	Password string
	DB       int
}

func New(ctx context.Context, addr string, password string, db int) *Cash {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
	})

	pong, err := client.Ping(ctx).Result()

	if err != nil {
		log.Fatal("Failed to connect to Redis:", err)
	}
	log.Println("Connected to Redis:", pong)
	return &Cash{
		Ctx:      ctx,
		Client:   client,
		Addr:     addr,
		Password: password,
		DB:       db,
	}
}

func (c *Cash) Set(key string, value interface{}) {
	cmd := c.Client.Set(c.Ctx, key, value, 0)
	log.Println(cmd)
}

func (c *Cash) Get(key string) {
	cmd := c.Client.Get(c.Ctx, key)
	log.Println(cmd)
}
