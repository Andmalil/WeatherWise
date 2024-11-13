package cache

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

type Cache struct {
	Ctx      context.Context
	Client   *redis.Client
	Addr     string
	Password string
	DB       int
}

func New(ctx context.Context, addr string, password string, db int) *Cache {
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
	return &Cache{
		Ctx:      ctx,
		Client:   client,
		Addr:     addr,
		Password: password,
		DB:       db,
	}
}

func (c *Cache) Set(key string, values ...interface{}) {
	c.Client.HSet(c.Ctx, key, values)
}

func (c *Cache) Get(key string) map[string]string {
	cmd := c.Client.HGetAll(c.Ctx, key)
	return cmd.Val()
}

func (c *Cache) Search(pattern string) []map[string]string {
	var values []map[string]string
	var cursor uint64
	keys, _ := c.Client.Scan(c.Ctx, cursor, "", 0).Val()
	for _, key := range keys {
		values = append(values, c.Client.HGetAll(c.Ctx, key).Val())
	}
	return values
}
