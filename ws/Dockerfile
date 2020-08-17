from python:3.8.5-buster

RUN apt update && apt install -y vim

RUN pip install Flask minio protobuf

WORKDIR /srv

# RUN wget https://github.com/protocolbuffers/protobuf/releases/download/v3.13.0/protobuf-all-3.13.0.tar.gz && \
#  tar -xzf protobuf-all-3.13.0.tar.gz && \
# cd protobuf-3.13.0/ && ./configure && make && make install

RUN wget https://github.com/protocolbuffers/protobuf/releases/download/v3.13.0/protoc-3.13.0-linux-x86_64.zip && \
  unzip -d /usr/local protoc-3.13.0-linux-x86_64.zip && \
	rm protoc-3.13.0-linux-x86_64.zip

RUN wget https://raw.githubusercontent.com/google/transit/master/gtfs-realtime/proto/gtfs-realtime.proto 

RUN protoc gtfs-realtime.proto --python_out .

COPY ./ /srv/

 # COPY ./20200815-161502_vehiclePositions.pb 20200815-161502_vehiclePositions.pb

ENV FLASK_APP=app.py

EXPOSE 5000
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["flask run --host=0.0.0.0"]
