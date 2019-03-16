PROJECT = nodejs_localstack_sample

.PHONY: up
up:
	docker-compose -p $(PROJECT) up -d --build

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose -p $(PROJECT) logs

.PHONY: restart
restart:
	docker-compose -p $(PROJECT) kill && \
    docker-compose -p $(PROJECT) rm -f && \
    docker-compose -p $(PROJECT) up -d --build

.PHONY: kill
kill:
	docker-compose -p $(PROJECT) kill

.PHONY: ps
ps:
	docker-compose -p $(PROJECT) ps
