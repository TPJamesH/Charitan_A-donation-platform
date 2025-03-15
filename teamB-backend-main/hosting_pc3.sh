#!/bin/bash

echo "-------------------------------------------------------------------"
echo "Starting Microservices..."
echo "-------------------------------------------------------------------"
cd microservices
npm install
docker-compose up -d
node servicesRegister.js
cd ..