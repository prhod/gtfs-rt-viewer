REGISTRY=docker-registry.canaltp.fr
APP=gtfs-rt-viewer-ws

release:
	  docker build -t $(REGISTRY)/prhod/$(APP) -f Dockerfile .
		docker push $(REGISTRY)/prhod/$(APP)


