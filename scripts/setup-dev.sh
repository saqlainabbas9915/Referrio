#!/bin/bash

# Make script executable
chmod +x ./scripts/setup-dev.sh

# Install dependencies
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
fi

# Start development server
echo "Starting development server..."
npm run dev 