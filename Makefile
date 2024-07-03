.PHONY: help startTest updateTest stopTest
.EXPORT_ALL_VARIABLES:

PROJECT_SLUG := "react-fast-template"
APP_NAME := $(PROJECT_SLUG)-backend
PRECOMMIT_CONFIG_PATH = "./dev_config/python/.pre-commit-config.yaml"
DOCKER_HUB := beafdocker

help: ## Help for project
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ANSI color codes
GREEN=$(shell tput -Txterm setaf 2)
YELLOW=$(shell tput -Txterm setaf 3)
RED=$(shell tput -Txterm setaf 1)
BLUE=$(shell tput -Txterm setaf 6)
RESET=$(shell tput -Txterm sgr0)

## Docker
startTest: ## Start docker development environment
	@echo "$(YELLOW)Starting docker environment...$(RESET)"
	docker compose -p $(PROJECT_SLUG) up --build

# This target can be used in a separate terminal to update any containers after a change in config without restarting (environment variables, requirements.txt, etc)
updateTest:  ## Update test environment containers (eg: after config changes)
	docker compose -p $(PROJECT_SLUG) up --build -d

stopTest: ## Stop test development environment
	@COMPOSE_PROJECT_NAME=$(PROJECT_SLUG) docker compose down


# Utilities
lint-backend: ## Format backend code
	@echo "$(YELLOW)Running linters for backend...$(RESET)"
	@cd backend && make format

lint-frontend: ## Format frontend code
	@echo "$(YELLOW)Running linters for frontend...$(RESET)"
	@cd frontend && npm run lint

lint: ## Format project
	@$(MAKE) -s lint-backend
	@$(MAKE) -s lint-frontend

test-frontend: ## Run frontend tests
	@echo "$(YELLOW)Running frontend tests...$(RESET)"
	@cd frontend && npm run test:unit

test-backend: ## Run backend tests
	@echo "$(YELLOW)Running backend tests...$(RESET)"
	docker exec react-fast-template-backend-1 ./test.sh

test: ## Run project tests
	@$(MAKE) -s test-frontend
	@$(MAKE) -s test-backend


# Using Terminal

## Command Line
# Install latest traefik in /usr/local/bin from https://github.com/containous/traefik/releases
lb: ## Spin up Traefik to mimic test/prod CloudFront/ALB setup across multiple services
	traefik --entryPoints.dev.address=:7000 --providers.file.filename=local-lb.yml

# Make localhost self-signed cert with: https://github.com/FiloSottile/mkcert
lb-ssl: ## Spin up Traefik to mimic test/prod CloudFront/ALB setup across multiple services with self-signed cer
	traefik --entryPoints.dev.address=:7000 --providers.file.filename=lb-ssl.yml

db: ## Create postgres db in docker
	@docker compose -f backend/docker-compose.yml up --build

serve-backend: ## Serve the backend in terminal
	@cd backend; make dev

serve-frontend: ## Serve the frontend in terminal
	@cd frontend; make dev

dev: ## Serve the project in terminal
	@echo "$(YELLOW)Running development in terminal...$(RESET)"
	pip install -r backend/requirements.txt --require-virtualenv
	make -j 4 lb db serve-backend serve-frontend

prep: ## Prepare postges database
	@echo "$(YELLOW)Preparing database...$(RESET)"
	@cd backend && ./prestart.sh

prep-docker: ## Prepare postges database
	@echo "$(YELLOW)Preparing docker database...$(RESET)"
	docker exec react-fast-template-backend-1 ./prestart.sh


# Backend Deployment
build: ## Build docker image for the project
	@echo "$(YELLOW)Building project image...$(RESET)"
	docker build -f backend/Dockerfile -t $(APP_NAME) ./backend

stage: ## Prepare postges database
	@echo "$(YELLOW)Staging for deployment...$(RESET)"
	docker tag $(APP_NAME):latest $(DOCKER_HUB)/$(APP_NAME):latest
	docker push $(DOCKER_HUB)/$(APP_NAME):latest

# Helpers
scaffold: ## Scaffold a resource
	@cd scripts && python scaffold.py run -n $(name)

pre-commit:
	npx concurrently --kill-others-on-fail --prefix "[{name}]" --names "frontend:lint,frontend:test,frontend:build,backend:lint,backend:test" \
	--prefix-colors "bgRed.bold.white,bgGreen.bold.white,bgBlue.bold.white,bgMagenta.bold.white" \
    "docker exec react-fast-template-frontend-1 npm run lint:check" \
    "docker exec react-fast-template-frontend-1 npm run test:unit" \
    "docker exec react-fast-template-frontend-1 npm run build" \
	"docker exec react-fast-template-backend-1 make format" \
	"docker exec react-fast-template-backend-1 make test"
