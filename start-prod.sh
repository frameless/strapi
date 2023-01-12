#!/bin/sh

docker-compose --file docker-compose.yml --file docker-compose.prod.yml up --build strapi
