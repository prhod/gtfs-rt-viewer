from flask import Flask, make_response
from minio import Minio
from minio.error import ResponseError

minio_host = 'minio.default.svc.cluster.local'
minio_host = 'minio-poc-carto.rhod.ovh:81'

mc = Minio(minio_host,
                  access_key='minioaccess',
                  secret_key='miniosecret',
                  secure=False)


app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/buckets')
def buckets():
    bucket_list = mc.list_buckets()
    result = ""
    for bucket in bucket_list:
        result += "  -  " + bucket.name
    return result


@app.route('/bucket/<string:bucket_name>')
def test_bucket(bucket_name):
    return bucket_name

@app.route('/bucket/<string:bucket_name>/gtfsrt/vl')
def gtfsrt_vl(bucket_name):
    try:
        try:
            obj = mc.get_object(bucket_name, 'gtfsrt/20200815-161502_vehiclePositions.json')
            resp = make_response(obj.read())
            resp.headers['content-type'] = 'application/json'
            return resp 
        finally:
            obj.close()
            obj.release_conn()
    except ResponseError as err:
       return err 

@app.route('/bucket/<string:bucket_name>/gtfsrt/vl2')
def gtfsrt_vl2(bucket_name):
    try:
        try:
            filename = '20200814-235903_vehiclePositions.pb'
            obj = mc.get_object(bucket_name, 'gtfsrt/20200814/' + filename)
            resp = make_response(obj.read())
            resp.headers['content-type'] = 'binary/octet-stream'
            resp.headers['Content-Disposition'] = 'inline; filename="{}"'.format(filename)
            return resp 
        finally:
            obj.close()
            obj.release_conn()
    except ResponseError as err:
       return err   

@app.route('/bucket/<string:bucket_name>/gtfsrt/vl3')
def gtfsrt_vl2(bucket_name):
    try:
        try:
            filename = '20200814-235903_vehiclePositions.pb'
            obj = mc.get_object(bucket_name, 'gtfsrt/20200814/' + filename)
            resp = make_response(obj.read())
            resp.headers['content-type'] = 'binary/octet-stream'
            resp.headers['Content-Disposition'] = 'inline; filename="{}"'.format(filename)
            return resp 
        finally:
            obj.close()
            obj.release_conn()
    except ResponseError as err:
       return err   
   
