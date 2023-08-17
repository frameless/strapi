#!/bin/bash

# Check if the correct number of arguments is provided
if [[ $# -lt 3 || $# -gt 4 ]]; then
    echo "Usage: $0 <project_name> <prod|dev> <up|down> [--build]"
    exit 1
fi

# Extract arguments
project_name=$1
env_type=$2
action=$3
build_arg=$4

# Validate project_path
if [[ ! -d "../apps/$project_name" ]]; then
    echo "Project '$project_name' does not exist in the specified location."
    exit 1
fi

# Validate env_type and action
if [[ $env_type != "prod" && $env_type != "dev" ]] || [[ $action != "up" && $action != "down" ]]; then
    echo "Invalid environment type or action. Usage: $0 <project_name> <prod|dev> <up|down> [--build]"
    exit 1
fi

# Check if build argument is provided
if [[ $build_arg == "--build" ]]; then
    build_command="--build"
fi

# Extract the first part of the project name
text="$(echo $project_name | tr '[:upper:]' '[:lower:]')"
result=$(echo "$text" | cut -d '-' -f 1)
echo "Extracted text: $result" 

cd ..

# Set the docker-compose file and env file names
compose_file="docker-compose.${result}.${env_type}.yml"
env_file=".${result}.${env_type}.env"

# Check if the docker-compose file exists
if [[ ! -f "$compose_file" ]]; then
    echo "Docker Compose file '$compose_file' does not exist in the project directory."
    exit 1
fi

# Check if the env file exists
if [[ ! -f "$env_file" ]]; then
    echo "Environment file '$env_file' does not exist in the project directory."
    exit 1
fi

# Create .env file for docker-compose
echo -n "" > "./.env"
while IFS= read -r line
do
    echo "$line" >> "./.env"
done < "$env_file"

# Load environment variables
. ./.env

# Run docker-compose command
if [ -n "$build_command" ]; then
  docker-compose -f "$compose_file" "$action" "$build_command"
  echo "Running docker-compose -f $compose_file $action $build_command"
else
  docker-compose -f "$compose_file" "$action"
  echo "Running docker-compose -f $compose_file $action"
fi

# Return to the previous directory
cd ..
