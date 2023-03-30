# Forcing docker to use linux/amd64 platform by default on macOS
# https://stackoverflow.com/questions/65612411/forcing-docker-to-use-linux-amd64-platform-by-default-on-macos
# If you are in an ARM-based CPU like Apple M1, you should use the --platform argument when you build the Docker image
	
build-production: 
	@echo Building and tagging BACKEND
	docker build --platform linux/amd64 -t teamsviluppo/critical-bundle-backend ./backend
	@echo Building and tagging FRONTEND
	docker build --platform linux/amd64 -t teamsviluppo/critical-bundle-frontend ./frontend
	@echo --- build-production finished ---

publish-production:
	@echo Publishing
	docker-compose -f ./docker-compose.yml --env-file .env down
	docker-compose -f ./docker-compose.yml --env-file .env rm
	docker-compose -f ./docker-compose.yml --env-file .env build
	docker-compose -f ./docker-compose.yml --env-file .env up -d --remove-orphans
	@echo --- publish stack finished ---
