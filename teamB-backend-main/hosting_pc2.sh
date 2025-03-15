#!/bin/bash

echo "-------------------------------------------------------------------"
echo "Starting Consul..."
echo "-------------------------------------------------------------------"
cd consul
docker-compose up -d
cd ..

echo "-------------------------------------------------------------------"
echo "Starting API Gateway..."
echo "-------------------------------------------------------------------"
cd api-gateway
npm install
docker-compose up -d
node registerApiGateway.js
cd ..

echo "-------------------------------------------------------------------"
echo "Starting Kafka..."
echo "-------------------------------------------------------------------"
cd kafka
npm install
docker-compose up -d
node kafkaRegister.js
cd ..