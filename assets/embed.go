package assets

import "embed"

//go:embed all:home
var StaticFile embed.FS
