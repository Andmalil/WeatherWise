package assets

import "embed"

//go:embed all:home
var StaticFiles embed.FS
