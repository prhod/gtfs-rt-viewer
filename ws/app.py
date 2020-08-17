from flask import Flask, make_response, request
from minio import Minio
from minio.error import ResponseError
import gtfs_realtime_pb2
import json
from google.protobuf import json_format
import protobuf_json
from datetime import datetime

minio_host = 'minio.default.svc.cluster.local:9000'

mc = Minio(minio_host,
                  access_key='minioaccess',
                  secret_key='miniosecret',
                  secure=False)

app = Flask(__name__)


@app.route('/')
def hello_world():
    resp = make_response('{"path": "./buckets"}')
    resp.headers['content-type'] = 'application/json'
    return resp 

@app.route('/buckets')
def buckets():
    bucket_list = mc.list_buckets()
    result = []
    for bucket in bucket_list:
        result.append(bucket.name)
    resp = make_response(json.dumps(result))
    resp.headers['content-type'] = 'application/json'
    return resp 


@app.route('/buckets/<string:bucket_name>')
def test_bucket(bucket_name):
    links = {
        "links": [ {"path": "./gtfsrt"}, {"path": ".gtfsrt/vl"}]
    }

    mc_objects = mc.list_objects_v2(bucket_name) 
    objects = []
    for obj in mc_objects:
        objects.append({"name": obj.object_name, "size": obj.size})
    objects = {
        "objects": objects
    }
    resp = make_response(json.dumps([links, objects]))
    resp.headers['content-type'] = 'application/json'
    return resp 


@app.route('/buckets/<string:bucket_name>/<path:uri>')
def gtfsrt_file_list(bucket_name, uri):
    fmt = request.args.get('format', 'pb')
    if fmt not in ['json', "pb"]:
        fmt = 'json'
    
    objects = mc.list_objects_v2(bucket_name, prefix=uri)
    object_list = []
    for obj in objects:
        object_list.append({"name": obj.object_name, "size": obj.size})
    if len(object_list) == 1 and object_list[0]["size"] != 0 :
        obj = mc.get_object(bucket_name, object_list[0]["name"]) 
        if fmt == 'pb':
            resp = make_response(obj.read())
            resp.headers['content-type'] = 'binary/octet-stream'
            resp.headers['Content-Disposition'] = 'inline; filename="{}"'.format(object_list[0]["name"]).split('/')[-1]
        else:
            fm = gtfs_realtime_pb2.FeedMessage()
            fm.ParseFromString(obj.read())
            resp = make_response(json.dumps(protobuf_json.pb2json(fm), separators=(',',':'))) 
            resp.headers['content-type'] = 'application/json'
            #resp.headers['Content-Disposition'] = 'inline; filename="{}"'.format(object_list[0]["name"]).split('/')[-1]
    else:
        resp = make_response(json.dumps(object_list))
        resp.headers['content-type'] = 'application/json'
    return resp 



