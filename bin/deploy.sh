#!/bin/bash

if [[ $1 = "prod" || $1 = "dev" ]] && [[ $2="up" || $2="down" ]] || [[ $3 = "--build" ]]; then
    cd ..
    fileEnv="docker-compose.${1}.yml"
    downOrUp=$2
    build=$3
    input="./.${1}.env"
    echo "Running docker-compose -f $fileEnv $downOrUp $build"

    echo -n "" > './.env'
    while IFS= read -r line
    do
 
    echo "$line" >> './.env'

    done < "$input"

    . ./.env

    docker-compose -f $fileEnv $downOrUp $build
else
    echo "Need to follow format ./deploy.sh prod|dev up|down"
fi