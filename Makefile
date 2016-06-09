DOCKER_REGISTRY=

export DOCKER_REGISTRY

build:
	sed 's|%DOCKER_REGISTRY%|$(DOCKER_REGISTRY)|g' Dockerfile > Dockerfile.tmp
	docker build \
		-f Dockerfile.tmp \
		--build-arg HTTP_PROXY=$(HTTP_PROXY) \
		-t $(DOCKER_REGISTRY)/codiopro-website-api .

install:
	docker push $(DOCKER_REGISTRY)/codiopro-website-api
