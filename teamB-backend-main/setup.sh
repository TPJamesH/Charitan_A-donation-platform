#!/bin/bash

echo "-------------------------------------------------------------------"
echo "Creating microservices network..."
echo "-------------------------------------------------------------------"
docker network create microservices || echo "Network already exists, skipping..."

echo "-------------------------------------------------------------------"
echo "Starting Consul docker..."
echo "-------------------------------------------------------------------"
cd consul || exit
docker-compose up -d
cd ..

echo "-------------------------------------------------------------------"
echo "Starting Kafka and Zookeeper docker..."
echo "-------------------------------------------------------------------"
cd kafka || exit
docker-compose up -d

echo "-------------------------------------------------------------------"
echo "Registering Kafka with Consul..."
echo "-------------------------------------------------------------------"
npm install
node kafkaRegister.js
cd ..

echo "-------------------------------------------------------------------"
echo "Installing dependencies for microservices..."
echo "-------------------------------------------------------------------"
cd microservices || exit
for dir in */; do
    if [ -f "$dir/package.json" ]; then
        echo "Installing dependencies in $dir..."
        cd "$dir" || exit
        npm install
        cd ..
    fi
done

echo "-------------------------------------------------------------------"
echo "Starting microservices docker..."
echo "-------------------------------------------------------------------"
docker-compose up -d
npm install
node servicesRegister.js
cd ..

echo "-------------------------------------------------------------------"
echo "Installing dependencies for API Gateway..."
echo "-------------------------------------------------------------------"
cd api-gateway || exit
if [ -f "package.json" ]; then
    echo "Installing dependencies in API Gateway..."
    npm install
fi
docker-compose up -d
node registerApiGateway.js
cd ..

echo "-------------------------------------------------------------------"
echo "Deploying to Ngrok..."
echo "-------------------------------------------------------------------"
echo Adding authtoken...
ngrok config add-authtoken 2rLNiX0KmI5iG9QI1IQvYVeV00X_4aUj9i3sJwZuua5ABmY5H
echo Deploying the app online...
ngrok http --url=famous-awfully-mammal.ngrok-free.app 3000