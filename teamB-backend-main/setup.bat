@echo off

echo -------------------------------------------------------------------
echo Creating microservices network...
echo -------------------------------------------------------------------
docker network create microservices

echo -------------------------------------------------------------------
echo Starting Consul docker...
echo -------------------------------------------------------------------
cd consul
docker-compose up -d
cd ..

echo -------------------------------------------------------------------
echo Starting Kafka and Zookeeper docker...
echo -------------------------------------------------------------------
cd kafka
docker-compose up -d

echo -------------------------------------------------------------------
echo Registering Kafka with Consul...
echo -------------------------------------------------------------------
call npm install
node kafkaRegister.js
cd ..

echo -------------------------------------------------------------------
echo Installing dependencies for microservices...
echo -------------------------------------------------------------------
cd microservices
for /D %%D in (*) do (
    if exist "%%D\package.json" (
        echo Installing dependencies in %%D...
        cd %%D
        call npm install
        cd ..
    )
)

echo -------------------------------------------------------------------
echo Starting microservices docker...
echo -------------------------------------------------------------------
docker-compose up -d
call npm install
node servicesRegister.js
cd ..

echo -------------------------------------------------------------------
echo Installing dependencies for API Gateway...
echo -------------------------------------------------------------------
cd api-gateway
if exist "package.json" (
    echo Installing dependencies in API Gateway...
    call npm install
)
docker-compose up -d
node registerApiGateway.js
cd ..

echo -------------------------------------------------------------------
echo Deploying to Ngrok...
echo -------------------------------------------------------------------
echo Adding authtoken...
ngrok config add-authtoken 2rLNiX0KmI5iG9QI1IQvYVeV00X_4aUj9i3sJwZuua5ABmY5H
echo Deploying the app online...
ngrok http --url=famous-awfully-mammal.ngrok-free.app 3000

pause