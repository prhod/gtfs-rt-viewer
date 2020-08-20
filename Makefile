REGISTRY=docker-registry.canaltp.fr

release_ws:
	  docker build -t $(REGISTRY)/prhod/gtfs-rt-viewer-ws -f ./ws/Dockerfile ./ws
		docker push $(REGISTRY)/prhod/gtfs-rt-viewer-ws

release_front:
		docker build -t $(REGISTRY)/prhod/gtfs-rt-viewer-front -f ./front/Dockerfile ./front
		docker push $(REGISTRY)/prhod/gtfs-rt-viewer-front

release: release_front release_ws
