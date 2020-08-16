from python:3.8.5-buster

RUN pip install Flask minio protobuf

WORKDIR /srv

RUN wget https://github.com/protocolbuffers/protobuf/releases/download/v3.13.0/protoc-3.13.0-linux-x86_64.zip && \
  tar -xzf protobuf-all-3.13.0.tar.gz && \
	cd protobuf-3.13.0/ && ./configure && make && make install

COPY ./app.py /srv/app.py

ENV FLASK_APP=app.py

EXPOSE 5000
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["flask run --host=0.0.0.0"]
