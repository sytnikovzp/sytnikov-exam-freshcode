#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################

project_name=$(basename "$PWD")

started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker compose --file docker-compose-dev.yaml up
echo ""

# Run Sequalize's migrations.
echo "-----> Running application migrations"
docker exec -it ${project_name}-server-dev-1 sequelize db:migrate
echo ""

# Run Sequalize's seeds.
echo "-----> Running application seeds"
docker exec -it ${project_name}-server-dev-1 sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
