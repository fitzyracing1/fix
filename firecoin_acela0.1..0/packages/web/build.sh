#!/bin/bash
set -e

echo "Building FireCoin web app..."
cd "$(dirname "$0")/.."
pnpm install
pnpm run build
echo "Build complete!"
