#!/bin/bash

# Script to build the Docker image for Dinesh's personal website

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Docker image for Dinesh's Personal Website...${NC}"

# Build the image
docker build -t dinesh-live:latest -f Dockerfile ..

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo -e "${GREEN}Image name: dinesh-live:latest${NC}"
    echo ""
    echo -e "${YELLOW}To run the container:${NC}"
    echo "  docker run -p 8080:80 dinesh-live:latest"
    echo ""
    echo -e "${YELLOW}Or use docker-compose:${NC}"
    echo "  docker-compose up -d"
    echo ""
    echo -e "${YELLOW}Then visit: http://localhost:8080${NC}"
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi 