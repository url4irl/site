#!/bin/bash

# Stop any running containers
docker compose -f docker-compose.yml down

# Remove the volume explicitly
docker volume rm site_directus_uploads || true
docker volume rm site_directus_extensions || true
docker volume rm site_postgres_data || true

# Force remove any dangling volumes
docker volume prune -f

# Remove the container to be sure
docker rm -f site-directus-1 || true
docker rm -f site-postgres-1 || true